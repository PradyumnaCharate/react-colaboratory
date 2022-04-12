import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';

//instead of using dispatch(action type each time in the code wheneever we want to dispatch action and
//use reducer we are creating this custom hook so that we can only say actionType(arguments ) and it
//will work fine i.e {updateCell}=useActions() can be destructured from this useActions() hook
//whenever we want to update cell)
export const useActions = () => {
  const dispatch = useDispatch();
   //useactions hook sends different version of createbundle every time it is called ad we have added
  //create bundle in dependency list of useEffect so it will be called each time and code cell will 
  //seem flashy by this constant rerendering so we will use useMemo so that that hook binds action
  //only onmce at starting time of app
  //so useMemo does what? whenever dispatch value changes(dependency array value) then it runs that 
  //function again
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
