import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { CodeCell } from './components/CodeCell';
import { TextEditor } from './components/TextEditor';

const App = () => {
  return (
    <div>
      <TextEditor />
      {/* <CodeCell /> */}
    </div>
  );
};

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
