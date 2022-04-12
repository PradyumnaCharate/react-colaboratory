import { ActionType } from '../action-types';
import { CellTypes } from '../cell';

//structure interfaces for each action type ..we will import this in action creators and follow these 
//structure
//avoid cyclical imports(We should know which file is exporting what and which file is importing what)
export type Direction = 'up' | 'down';
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    //id of cell to move and direction up or down
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
   //we will only need id of cell to delete
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    //we will need id of cell after which we have to add cell and type of cell we want to add 
    //editor or code cell
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  //id of cell to update and updated content
  payload: {
    id: string;
    content: string;
  };
}
export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    //we are going to show loading spinner when code is bundling so in which cell we should show spinner
    //thats why we will receive cell id ass payload
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    //we couuld be bundling multiple cells at same time so id is important
    cellId: string;
    //and if bundle is succesfull then code will be there or error will be therer
    bundle: {
      code: string;
      err: string;
    };
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction;
