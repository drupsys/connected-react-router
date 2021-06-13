import { History, Location } from "history";
import { each, compact } from "lodash";
import { race, take, put, fork, StrictEffect } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { IHistoryActionTypes, HistoryActionType, IHistoryActionCreated, historyUpdated } from "./actions";

const changeHistory = (history: History) => (event: IHistoryActionTypes) => {
  switch (event.type) {
    case HistoryActionType.HISTORY_PUSHED: {
      const { path, state } = event.payload;
      history.push(path, state);
      return;
    }
    case HistoryActionType.HISTORY_REPLACED: {
      const { path, state } = event.payload;
      history.replace(path, state);
      return;
    }
    case HistoryActionType.HISTORY_GO: {
      history.go(event.payload.n);
      return;
    }
    case HistoryActionType.HISTORY_BACK: {
      history.goBack();
      return;
    }
    case HistoryActionType.HISTORY_FORWARD: {
      history.goForward();
      return;
    }
  }
};

function* locationSaga(history: History): Generator<StrictEffect, void, Location> {
  const channel = eventChannel<Location>((emitter) => history.listen(emitter));

  while (true) {
    const location = yield take(channel);
    yield put(historyUpdated(location));
  }
}

type IEvents = IHistoryActionTypes[];

function* historySagas() {
  const { payload: { history } }: IHistoryActionCreated = yield take(HistoryActionType.HISTORY_CREATED);

  yield put(historyUpdated(history.location));
  yield fork(locationSaga, history);

  while (true) {
    const events: IEvents = yield race([
      take(HistoryActionType.HISTORY_PUSHED),
      take(HistoryActionType.HISTORY_REPLACED),
      take(HistoryActionType.HISTORY_GO),
      take(HistoryActionType.HISTORY_BACK),
      take(HistoryActionType.HISTORY_FORWARD),
    ]);

    each(compact(events), changeHistory(history));
  }
}

export default historySagas;
