import './text-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Type Here...');

  useEffect(() => {
    //if user clicks outside markdown editor we will exit editing mode and set preview mode 
    //and if user clicks on markdown editor editing mode will be set or remain active
    //we have set reference mark editor so if event target in ref.current it means user has clicked 
    //on markdown editor
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        //as node means we are telling typescript to interprit type of this as node 
        //becuase ref,current.contains expects it to be of node type
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      
      <div className="text-editor" ref={ref}>
        {
          ////if v is undefined put empty string
        }
        <MDEditor value={value} onChange={(v) => setValue(v || '')} />
      </div>
    );
  }

  return (
    {
      //card is for getting margin around editor
    }
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
