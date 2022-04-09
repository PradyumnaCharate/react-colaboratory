import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    //set timeout when user changes input in code editor for 1 second and then automatically bundle
    //the code and
    //save this setTimeout to timer which is reference to that function's return object 
    const timer = setTimeout(async () => {
      
      const output = await bundle(input);
      //set the code object as bundled code
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
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
