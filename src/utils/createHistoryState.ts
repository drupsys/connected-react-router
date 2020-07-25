import { IHistory, initialState } from "../historyReducer";
import { Location } from "history";

export const createLocationState = (overwrites: Partial<Location> = {}): Location => ({
  ...initialState.location,
  ...overwrites,
});

const createHistoryState = (overwrites: Partial<IHistory> = {}): IHistory => ({
  ...initialState,
  ...overwrites,
});

export default createHistoryState;
