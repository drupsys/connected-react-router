import { Location, LocationState, Path, History } from "history";
import IAction from "./IAction";

export enum HistoryActionType {
  HISTORY_CREATED = "@router/HISTORY_CREATED",
  HISTORY_UPDATED = "@router/HISTORY_UPDATED",
  HISTORY_PUSHED = "@router/HISTORY_PUSHED",
  HISTORY_REPLACED = "@router/HISTORY_REPLACED",
  HISTORY_GO = "@router/HISTORY_GO",
  HISTORY_BACK = "@router/HISTORY_BACK",
  HISTORY_FORWARD = "@router/HISTORY_FORWARD",
}

export interface IHistoryActionCreated extends IAction<HistoryActionType.HISTORY_CREATED> {
  payload: {
    history: History;
  };
}

export interface IHistoryActionUpdated extends IAction<HistoryActionType.HISTORY_UPDATED> {
  payload: {
    location: Location;
  };
}

export interface IHistoryActionPush<
  TState extends LocationState = {}
> extends IAction<HistoryActionType.HISTORY_PUSHED> {
  payload: {
    path: Path;
    state?: TState;
  };
}

export interface IHistoryActionReplace<
  TState extends LocationState = {}
> extends IAction<HistoryActionType.HISTORY_REPLACED> {
  payload: {
    path: Path;
    state?: TState;
  };
}

export interface IHistoryActionGo extends IAction<HistoryActionType.HISTORY_GO> {
  payload: {
    n: number;
  };
}

export interface IHistoryActionBack extends IAction<HistoryActionType.HISTORY_BACK> {}

export interface IHistoryActionForward extends IAction<HistoryActionType.HISTORY_FORWARD> {}

type IHistoryActionTypes = IHistoryActionCreated
  | IHistoryActionUpdated
  | IHistoryActionPush
  | IHistoryActionReplace
  | IHistoryActionGo
  | IHistoryActionBack
  | IHistoryActionForward;

export default IHistoryActionTypes;
