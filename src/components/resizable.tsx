import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';

interface ResizableProps {
  //only these 2 strings will be availble as sirection prop
  direction: 'horizontal' | 'vertical';
}

//children is thing when we render resizable component and inside that any other component is rendered
//so we will render code cell inside this resizable so it will be passed as children to this component
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  //type of props of resizable box props
  let resizableProps: ResizableBoxProps;
  //browser height
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  //browser width
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  //code editor width
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        //but wwhenever user resizes the browser these window values will change and 
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        //if editor width is greater than browser width then change editor width to 0.75 of browser width
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      //min and max amount user can expand
      
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        //on size stop pass event and data and in data we have current width of resizable box we will set it
        //width so that even if browser window size changes iresizable editor size remains same
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
