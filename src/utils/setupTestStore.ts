import { historyCreated } from "../actions/HistoryActions";
import historySagas from "../historySagas";
import { createMemoryHistory } from "history";
import ReduxSagaTester from "redux-saga-tester";
import { ReducersMapObject } from "redux";

export class SagaTester<StateType extends object> extends ReduxSagaTester<StateType> {
  public clearActions() {
    (this as any).calledActions = [];
    (this as any).actionLookups = {};
  }
}

const setupTestStore = <S extends object>(rootReducer: ReducersMapObject<S, any>) => (clearEvents = true) => {
  const reducers: ReducersMapObject<S, any> = {
    ...rootReducer,
  };

  const sagas = new SagaTester<S>({ reducers });

  sagas.start(historySagas);
  const history = createMemoryHistory();
  sagas.dispatch(historyCreated(history));
  if (clearEvents) {
    sagas.clearActions();
  }

  return { sagas, history };
};

export default setupTestStore;
