# JS-book
## Description 

JS-book  is an interactive coding environment. You can write JavaScript, see it executed, and write comprehensive documentation using markdown.  
It is a CLI application running using local-api, allowing to save your documentation into selected file on hardrive.  
[Here is a live demo](https://stgran66.github.io/jsbook-client/) version to show application capabilities.  
[NPM package page](https://www.npmjs.com/package/js-notebook-stgran)

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Tools and libraries](#tools)


## Installation
Install package  
`npm install js-notebook-stgran -g`  
And run command  
`js-notebook-stgran serve [filename.js] [-p portnumber]`  
It will open or create a file in your current directory (by defaults app opens or creates file named notebook.js)  

Alternatively, you can start the app with the package runner:  
`npx js-notebook-stgran serve [filename.js] [-p portnumber]`  

This will start a server that serves the JS-book interface for the specified file. You can then open your browser and navigate to http://localhost:4005 (by default) to start using JS-book.

## Usage

- Click any text cell to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!
- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values
- Re-order or delete cells using buttons on the top right
- Format code with Prettier using format button
- Add new cells by hovering on the divider between each cell
- You can directly import form NPM! 

All of your changes get saved to the file you opened JS-notebook with. So if you ran `npx js-notebook-stgran serve test.js`, all of the text and code you write will be saved to the `test.js` file.  

Some examples:  
Cell #1:
```javascript
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click
      </button>
      <h3>Count: {count}</h3>
    </div>
  );
};
// Display any variable or React Component by calling 'show'
show(Counter); //React Component can be displayed as jsx (show(<Counter/>))
```  

Cell #2: 
```javascript
const App = () => {
  return (
    <div>
      <h3>App says hi!</h3>
      <i>Counter component will be rendered below...</i>
      <hr />
      {/* Counter was declared in the previous cell - 
        we can reference it here! */}
      <Counter />
    </div>
  );
};

show(<App/>)
```

## Tools
- [Monaco code editor](https://www.npmjs.com/package/monaco-editor)
- [esbuild](https://www.npmjs.com/package/esbuild)
- [Lerna](https://www.npmjs.com/package/lerna)
- [Axios](https://www.npmjs.com/package/axios)
- [Prettier](https://www.npmjs.com/package/prettier)
- [Redux](https://www.npmjs.com/package/redux)
- [LocalForage](https://www.npmjs.com/package/localforage)
- [Express](https://www.npmjs.com/package/express)
- [Commander](https://www.npmjs.com/package/commander)





