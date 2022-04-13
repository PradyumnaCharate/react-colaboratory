import './code-cell.css';
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../redux';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

//previously we were not taking cell as argument but now to update only that specific cell out of 
//all cells we are taking specific cell as argument
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  //useactions hook sends different version of createbundle every time it is called ad we have added
  //create bundle in dependency list of useEffect so it will be called each time and code cell will 
  //seem flashy by this constant rerendering so we will use useMemo so that that hook binds action
  //only onmce at starting time of app
  const { updateCell, createBundle } = useActions();
  //instead of input and setInput we will directly update the cell contents
  //input will be replaced buy cell.contents 
  //setInput will be replaced by updateCell(cell.id)
  //bundle has bundle.code and bundle.error and bundle.loading
  const bundle = useTypedSelector((state) => state.bundles && state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    //if bundle is not there immediately bundle the code(1st time app starts up)
    if (!bundle) {
      // create bundle is action creator taking cell.id and cell.content and it will bundle the code 

      createBundle(cell.id, cumulativeCode);
      return;
    }
    //set timeout when user changes input in code editor for 1 second and then automatically bundle
    //the code and
    //save this setTimeout to timer which is reference to that function's return object 
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);
    //if you return function inside useEffect then it will be called automaticalluy whenever 
    //useeffect is called. this is inbuild feature.
    //above we saved settimeout to timer  object so here if user does press key and changes code 
    //before 1 second then we will clearout timer and set new timer again for 1 second

    return () => {
      clearTimeout(timer);
    };
    //to disable dependency check warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle]);

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
        <div className="progress-wrapper">
          {
            //below is conditional rendering if code is empty then bundle is not there or bundle.loading
            //true then show loading progress bar
          }
          {!bundle || bundle.loading ? (
            //progress is html element annd progress is small primary is coming from bulma css
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
