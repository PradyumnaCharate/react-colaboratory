import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux';

//redux selectors are getters for redux state.selectors encapsulate structure of state and are reuusable.
//selectors ca also compute derived properties
//so selector is function that accepts redux state as an argument and returns data that is derived from 
//that state
//in selectors its best practice to not use asynchronous operations..only use synchronous operations


//why should we use them?
//it is good to keep your redux store state minimal and derive data from the state as needed.
//selector help with that.they can compute derived data allowing redux to store minimal possible state.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
