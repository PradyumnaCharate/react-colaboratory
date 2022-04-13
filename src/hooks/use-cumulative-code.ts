import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    //we are defining show function if parameter is object type without reract jsx object then we 
    //will json stringify it and show it but if it is react jsx then it will have two properties for sure 
    //$$typeOf and props properties so if element has that then use reactdom to render it
    //we are ovverriding _React with React in index.js in bundler.js
    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    var show = (value) => {
      const root = document.querySelector('#root');

      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    };
  `;
  //duplicate show func so that next cells dont show previous cells show output
    const showFuncNoop = 'var show = () => {}';
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          //duplicate show func so that next cells dont show previous cells show output
          //so if current cell is same as current executing cell then use original show function
          //otherwise showfun with noperations
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      //only add code uupto current cell
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
};
