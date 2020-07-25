import { Location } from "history";
import { Reducer } from "redux";
import { IHistoryActionTypes, HistoryActionType } from "./actions";

export interface IHistory {
  location: Location;
}

export const initialState: IHistory = {
  location: {
    hash: "",
    pathname: "/",
    search: "",
    state: undefined,
  },
};

type ReducerType = Reducer<IHistory, IHistoryActionTypes>;
const historyReducer: ReducerType = (state = initialState, action) => {
  switch (action.type) {
    case HistoryActionType.HISTORY_CREATED:
      return {
        location: action.payload.history.location,
      };
    case HistoryActionType.HISTORY_UPDATED:
      return {
        location: action.payload.location,
      };
    default: {
      return state;
    }
  }
};

export default historyReducer;
