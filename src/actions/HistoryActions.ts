import { Location } from "history";
import { NavigateFunction, NavigateOptions, To } from "react-router-dom";
import {
  HistoryActionType,
  INavigateAction as INavigateAction,
  IHistoryActionCreated,
  IHistoryActionUpdated,
  IHistoryActionPush,
  IHistoryActionReplace,
  IHistoryActionGo,
  IHistoryActionBack,
  IHistoryActionForward,
} from "./IHistoryActionTypes";

export function navigate(delta: number): IHistoryActionGo;
export function navigate(to: To, options?: NavigateOptions): INavigateAction;
export function navigate(to: number | To, options?: NavigateOptions): IHistoryActionGo | INavigateAction {
  if (typeof to === 'number') {
    return {
      type: HistoryActionType.HISTORY_GO,
      payload: { n: to }
    }
  } else {
    return {
      type: HistoryActionType.NAVIGATED,
      payload: { to, options }
    }
  }
}

export const historyCreated = (navigate: NavigateFunction): IHistoryActionCreated => ({
  type: HistoryActionType.HISTORY_CREATED,
  payload: { navigate },
});

export const historyUpdated = (location: Location): IHistoryActionUpdated => ({
  type: HistoryActionType.HISTORY_UPDATED,
  payload: { location },
});

/**
 * @deprecated use 'navigate' action instead
 */
export const historyPush = <TState>(path: string, state?: TState): IHistoryActionPush<TState> => ({
  type: HistoryActionType.HISTORY_PUSHED,
  payload: { path: { hash: "", pathname: path, search: "" }, state },
});

/**
 * @deprecated use 'navigate' action instead
 */
export const historyReplace = <
  TState
>(path: string, state?: TState): IHistoryActionReplace<TState> => ({
  type: HistoryActionType.HISTORY_REPLACED,
  payload: { path: { hash: "", pathname: path, search: "" }, state },
});

/**
 * @deprecated use 'navigate' action instead
 */
export const historyGo = (n: number): IHistoryActionGo => ({
  type: HistoryActionType.HISTORY_GO,
  payload: { n },
});

/**
 * @deprecated use 'navigate' action instead
 */
export const historyBack = (): IHistoryActionBack => ({
  type: HistoryActionType.HISTORY_BACK,
});

/**
 * @deprecated use 'navigate' action instead
 */
export const historyForward = (): IHistoryActionForward => ({
  type: HistoryActionType.HISTORY_FORWARD,
});
