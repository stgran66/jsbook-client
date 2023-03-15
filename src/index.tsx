import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { bundle } from './bundler';
import { CodeEditor } from './components/code-editor';
import { Preview } from './components/Preview';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input);

    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue='const a=1;'
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
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
