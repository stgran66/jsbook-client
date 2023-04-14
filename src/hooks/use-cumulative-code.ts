import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderCells = order.map((id) => data[id]);

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = (value) => {
        const root = document.querySelector('#root');
        const reactRoot = _ReactDOM.createRoot(root);

        if(typeof value === 'function') {
          reactRoot.render(_React.createElement(value));
          return;
        }
        
        if (typeof value === 'object') {
            if(value.$$typeof && value.props) {
              reactRoot.render(value)
            } else {
            root.innerHTML = JSON.stringify(value);
            }

            } else {
            root.innerHTML = value;
            }
};
      `;

    const showFuncNoop = 'var show = () => {}';
    const cumulativeCode = [];
    for (let c of orderCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode.join('\n');
  });
};
