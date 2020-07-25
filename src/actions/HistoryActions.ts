import { Location, LocationState, Path, History } from "history";
import {
  HistoryActionType,
  IHistoryActionCreated,
  IHistoryActionUpdated,
  IHistoryActionPush,
  IHistoryActionReplace,
  IHistoryActionGo,
  IHistoryActionBack,
  IHistoryActionForward,
} from "./IHistoryActionTypes";

export const historyCreated = (history: History): IHistoryActionCreated => ({
  type: HistoryActionType.HISTORY_CREATED,
  payload: { history },
});

export const historyUpdated = (location: Location): IHistoryActionUpdated => ({
  type: HistoryActionType.HISTORY_UPDATED,
  payload: { location },
});

export const historyPush = <TState extends LocationState>(path: Path, state?: TState): IHistoryActionPush<TState> => ({
  type: HistoryActionType.HISTORY_PUSHED,
  payload: { path, state },
});

export const historyReplace = <
  TState extends LocationState
>(path: Path, state?: TState): IHistoryActionReplace<TState> => ({
  type: HistoryActionType.HISTORY_REPLACED,
  payload: { path, state },
});

export const historyGo = (n: number): IHistoryActionGo => ({
  type: HistoryActionType.HISTORY_GO,
  payload: { n },
});

export const historyBack = (): IHistoryActionBack => ({
  type: HistoryActionType.HISTORY_BACK,
});

export const historyForward = (): IHistoryActionForward => ({
  type: HistoryActionType.HISTORY_FORWARD,
});
