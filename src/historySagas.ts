import { each, compact } from "lodash";
import { NavigateFunction } from "react-router-dom";
import { race, take } from "redux-saga/effects";
import { IHistoryActionTypes, HistoryActionType, IHistoryActionCreated } from "./actions";

const changeHistory = (navigate: NavigateFunction) => (event: IHistoryActionTypes) => {
  switch (event.type) {
    case HistoryActionType.NAVIGATED: {
      const { to, options } = event.payload;
      navigate(to, options);
      return;
    }
    case HistoryActionType.HISTORY_PUSHED: {
      const { path, state } = event.payload;
      navigate(path, { state });
      return;
    }
    case HistoryActionType.HISTORY_REPLACED: {
      const { path, state } = event.payload;
      navigate(path, { replace: true, state });
      return;
    }
    case HistoryActionType.HISTORY_GO: {
      navigate(event.payload.n);
      return;
    }
    case HistoryActionType.HISTORY_BACK: {
      navigate(-1);
      return;
    }
    case HistoryActionType.HISTORY_FORWARD: {
      navigate(1);
      return;
    }
  }
};

type IEvents = IHistoryActionTypes[];

function* historySagas() {
  const { payload: { navigate } }: IHistoryActionCreated = yield take(HistoryActionType.HISTORY_CREATED);

  while (true) {
    const events: IEvents = yield race([
      take(HistoryActionType.HISTORY_PUSHED),
      take(HistoryActionType.HISTORY_REPLACED),
      take(HistoryActionType.HISTORY_GO),
      take(HistoryActionType.HISTORY_BACK),
      take(HistoryActionType.HISTORY_FORWARD),
    ]);

    each(compact(events), changeHistory(navigate));
  }
}

export default historySagas;
