import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import produce from 'immer';

//interface for structure of state we will return from this reducer
interface CellsState {
  //when cells are in loading state
  loading: boolean;
  //if not loaded correctly
  error: string | null;
  //order of cells in notebook represented by array in which all cell's ids are present
  order: string[];
  //key value pair 
  data: {
    [key: string]: Cell;
  };
}
//initial state of cells when app loads up
const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

//2 arguments state =initial state which is of type interface CellsState
//actions are all different possible types interfaces for actions types
const reducer = produce((
  state: CellsState = initialState,
  action: Action,
  
  //this function is going to return CellsState object so giving that type but with immer library we 
  //wont give retuurn type because immer itself figure ouut what to return but here sometimes
  //we are returning nothing so typescript will give function type as Celltype | undefined.
  //this undefined type can cause some problems so add return state instead of return
)=> {
  switch (action.type) {
    /*1 example with our handwritten simple reducer 
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      //this logic become too long and complex so we are using immer library

      return {
        //
        ...state,
        data: {
          ...state.data,
          //id of cell to update and inside there previous state of state id and new content
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };
      */
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
  
        state.data[id].content = content;
        return state;
      case ActionType.DELETE_CELL:
        //action.payload contains id of cell to delete cell
        //we have to remove id and object data of that cell from state.data and 
        //also from cells order array
        delete state.data[action.payload];
        //filter the array and make new arry excluding id of deleted cell
        state.order = state.order.filter((id) => id !== action.payload);
  
        return state;
      case ActionType.MOVE_CELL:
        //payload has id and direction
        const { direction } = action.payload;
        //finding current index of cell in order array
        const index = state.order.findIndex((id) => id === action.payload.id);
        //calculating index to which user wants to move cell
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        //if new index is out of bound of array length then just return..cell will remain at same index
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }
        //swapp cells forward or backward
  
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
  
        return state;
      /*case ActionType.INSERT_CELL_BEFORE:
        //payload is gonna be id of cell above which we want to insert cell and type of cell
        //1st creating new cell
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: randomId(),
        };
          //assigning new cell into array
        state.data[cell.id] = cell;
        //index of after cell 
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        //
        if (foundIndex < 0) {
          //push it at end of order array
          state.order.push(cell.id);
        } else {
          //insert at that position
          state.order.splice(foundIndex, 0, cell.id);
        }
  
        return state;
        */
        case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      return state;
    default:
      return state;
  }
},initialState);
  
  const randomId = () => {
    return Math.random().toString(36).substring(2, 5);
  };
  
  export default reducer;
  