import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: ['djfy9', '2bl4q', '4o15k'],
  data: {
    djfy9: {
      content:
        '# JS-notebook\n\nThis is an interactive coding environment. You can write JavaScript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell (including this one) to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!\n- You can show any React component, string, number, or anything else by calling the `show ` function. This is a function built into this environment. Call show multiple times to show multiple values\n- Re-order or delete cells using buttons on the top right\n- Format code with Prettier using format button\n- Add new cells by hovering on the divider between each cell\n\nAll of your changes get saved to the file you opened JS-notebook with. So if you ran `npx js-notebook-stgran serve test.js`, all of the text and code you write will be saved to the `test.js` file.\n',
      type: 'text',
      id: 'djfy9',
    },
    '2bl4q': {
      content:
        "import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <button\n        onClick={() => {\n          setCount(count + 1);\n        }}\n      >\n        Click\n      </button>\n      <h3>Count: {count}</h3>\n    </div>\n  );\n};\n// Display any variable or React Component by calling 'show'\nshow(Counter); //React Component can be displayed as jsx (show(<Counter/>))",
      type: 'code',
      id: '2bl4q',
    },
    '4o15k': {
      content:
        'const App = () => {\n  return (\n    <div>\n      <h3>App says hi!</h3>\n      <i>Counter component will be rendered below...</i>\n      <hr />\n      {/* Counter was declared in the previous cell - \n        we can reference it here! */}\n      <Counter />\n    </div>\n  );\n};\n\nshow(<App/>)',
      type: 'code',
      id: '4o15k',
    },
  },
};

const reducer = produce(
  (state: CellsState = initialState, action: Action): CellsState | void => {
    switch (action.type) {
      case ActionType.SAVE_CELLS_ERROR:
        state.error = action.payload;

        return state;
      case ActionType.FETCH_CELLS:
        state.loading = true;
        state.error = null;

        return state;
      case ActionType.FETCH_CELLS_COMPLETE:
        state.order = action.payload.map((cell) => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState['data']);

        return state;
      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;

        return state;
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;

        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);

        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: randomId(),
        };

        state.data[cell.id] = cell;

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(foundIndex + 1, 0, cell.id);
        }

        return state;
      default:
        return state;
    }
  },
  initialState
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

export default reducer;
