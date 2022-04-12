import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import { Cell } from '../redux';
import { useActions } from '../hooks/use-actions';

//previously we were not taking cell as argument but now to update only that specific cell out of 
//all cells we are taking specific cell as argument
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  //now also code and setCode and error will be replaced by redux store respective elements
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  //instead of input and setInput we will directly update the cell contents through redux store
  //input will be replaced buy cell.contents 
  //setInput will be replaced by updateCell(cell.id)
  
  const { updateCell } = useActions();

  useEffect(() => {
     //set timeout when user changes input in code editor for 1 second and then automatically bundle
    //the code and
    //save this setTimeout to timer which is reference to that function's return object 
    const timer = setTimeout(async () => {
      //we are no longer bundling the code locally ...we will bundle the code in redux store
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);
      //if you return function inside useEffect then it will be called automaticalluy whenever 
    //useeffect is called. this is inbuild feature.
    //above we saved settimeout to timer  object so here if user does press key and changes code 
    //before 1 second then we will clearout timer and set new timer again for 1 second

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
