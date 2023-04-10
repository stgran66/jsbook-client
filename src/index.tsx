import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state';
import { CellList } from './components/cell-list';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
        {/* <CodeCell /> */}
      </div>
    </Provider>
  );
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
