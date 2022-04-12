import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

//interface for structure of state we will return from this reducer
interface BundlesState {
    //key is id of cell
  [key: string]:
     {
        //if bundluing is ongoing then loaduing is true
        loading: boolean;
        //on complete bundling will return code
        code: string;
        //error will be shown if there is any
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const reducer = produce(
    //state is 1st argument Type of state is mentioned and default value of state is initial state
    //actions are actions
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
          //look at that cell id in state object array and turn loading of that cell to true
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: '',
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
