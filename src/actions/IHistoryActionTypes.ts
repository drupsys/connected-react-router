import { Location, Path } from "history";
import { NavigateFunction, NavigateOptions, To } from "react-router-dom";
import IAction from "./IAction";

export enum HistoryActionType {
  NAVIGATED = "@router/NAVIGATED",
  HISTORY_CREATED = "@router/HISTORY_CREATED",
  HISTORY_UPDATED = "@router/HISTORY_UPDATED",
  HISTORY_PUSHED = "@router/HISTORY_PUSHED",
  HISTORY_REPLACED = "@router/HISTORY_REPLACED",
  HISTORY_GO = "@router/HISTORY_GO",
  HISTORY_BACK = "@router/HISTORY_BACK",
  HISTORY_FORWARD = "@router/HISTORY_FORWARD",
}

export interface INavigateAction extends IAction<HistoryActionType.NAVIGATED> {
  payload: {
    to: To;
    options?: NavigateOptions;
  };
}

export interface IHistoryActionCreated extends IAction<HistoryActionType.HISTORY_CREATED> {
  payload: {
    navigate: NavigateFunction;
  };
}

export interface IHistoryActionUpdated extends IAction<HistoryActionType.HISTORY_UPDATED> {
  payload: {
    location: Location;
  };
}

/**
 * @deprecated
 */
export interface IHistoryActionPush<
  TState = {}
> extends IAction<HistoryActionType.HISTORY_PUSHED> {
  payload: {
    path: Path;
    state?: TState;
  };
}

/**
 * @deprecated
 */
export interface IHistoryActionReplace<
  TState = {}
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

/**
 * @deprecated
 */
export interface IHistoryActionBack extends IAction<HistoryActionType.HISTORY_BACK> {}

/**
 * @deprecated
 */
export interface IHistoryActionForward extends IAction<HistoryActionType.HISTORY_FORWARD> {}

type IHistoryActionTypes =
  | INavigateAction
  | IHistoryActionCreated
  | IHistoryActionUpdated
  | IHistoryActionPush
  | IHistoryActionReplace
  | IHistoryActionGo
  | IHistoryActionBack
  | IHistoryActionForward;

export default IHistoryActionTypes;
