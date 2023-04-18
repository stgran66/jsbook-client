import './cell-list.css';
import { Fragment } from 'react';
// import { useTypedSelector } from '../hooks/use-typed-selector';
import { CellListItem } from './cell-list-item';
import { AddCell } from './add-cell';
import { Cell } from '../state';
// import { useActions } from '../hooks/use-actions';

const defaultCells: Cell[] = [
  {
    content:
      '# JS-notebook\n\nThis is an interactive coding environment. You can write JavaScript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell (including this one) to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!\n- You can show any React component, string, number, or anything else by calling the `show ` function. This is a function built into this environment. Call show multiple times to show multiple values\n- Re-order or delete cells using buttons on the top right\n- Format code with Prettier using format button\n- Add new cells by hovering on the divider between each cell\n\nAll of your changes get saved to the file you opened JS-notebook with. So if you ran `npx js-notebook-stgran serve test.js`, all of the text and code you write will be saved to the `test.js` file.\n',
    type: 'text',
    id: 'djfy9',
  },
  {
    content:
      "import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <button\n        onClick={() => {\n          setCount(count + 1);\n        }}\n      >\n        Click\n      </button>\n      <h3>Count: {count}</h3>\n    </div>\n  );\n};\n// Display any variable or React Component by calling 'show'\nshow(Counter); //React Component can be displayed as jsx (show(<Counter/>))",
    type: 'code',
    id: '2bl4q',
  },
  {
    content:
      'const App = () => {\n  return (\n    <div>\n      <h3>App says hi!</h3>\n      <i>Counter component will be rendered below...</i>\n      <hr />\n      {/* Counter was declared in the previous cell - \n        we can reference it here! */}\n      <Counter />\n    </div>\n  );\n};\n\nshow(<App/>)',
    type: 'code',
    id: '4o15k',
  },
];

export const CellList: React.FC = () => {
  const cells = defaultCells;
  //   useTypedSelector(({ cells: { order, data } }) =>
  //   order.map((id) => data[id])
  // );

  // const { fetchCells } = useActions();

  // useEffect(() => {
  //   fetchCells();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const rederedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {rederedCells}
    </div>
  );
};
