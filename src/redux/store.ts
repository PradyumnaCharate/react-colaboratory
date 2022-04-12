import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';

export const store = createStore(reducers, {}, applyMiddleware(thunk));




//we can manually dispatch action to manual test
//store.dispatch({type:ActionType.INSERT_CELL_BEFORE,payload:id:null type:code})
//and then get store set
//if you manually want to get state of store
//store.getState();
    
