import {
  historyPush,
  historyUpdated,
  historyReplace,
  historyGo,
  historyBack,
  historyForward,
} from "../actions";
import { HistoryActionType } from "../actions/IHistoryActionTypes";
import { setupTestStore, createLocationState } from "../utils";
import historyReducer from "../historyReducer";

const buildTestStore = setupTestStore({
  history: historyReducer,
});

describe("historySagas.ts", () => {
  it("should dispatch initial history updated action", async () => {
    const { sagas } = buildTestStore(false);

    const action: any = await sagas.waitFor(HistoryActionType.HISTORY_UPDATED);
    const location = createLocationState();
    const { key, ...rest } = historyUpdated(location).payload.location;

    expect(action.payload.location).toEqual(expect.objectContaining(rest));
  });

  it("should dispatch history updated action if history changes", async () => {
    const { sagas } = buildTestStore();
    sagas.dispatch(historyPush("/page/comments"));

    const action: any = await sagas.waitFor(HistoryActionType.HISTORY_UPDATED);
    const location = createLocationState({ pathname: "/page/comments" });
    const { key, ...rest } = historyUpdated(location).payload.location;

    expect(action.payload.location).toEqual(expect.objectContaining(rest));
  });

  describe("HISTORY_PUSHED action", () => {
    it("should update the history state if action is dispatched", () => {
      const onUpdate = jest.fn();
      const { sagas, history } = buildTestStore();
      history.listen(onUpdate);
      sagas.dispatch(historyPush("/new/path"));
      expect(onUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: "/new/path" }),
        expect.anything(),
      );
    });

    it("should push a location entry to history", () => {
      const { sagas, history } = buildTestStore();

      const entryCount = history.length;
      sagas.dispatch(historyPush("/new/path"));
      expect(history.length).toEqual(entryCount + 1);
    });

    it("should dispatch history updated event after successful history push", async () => {
      const { sagas } = buildTestStore();

      sagas.dispatch(historyPush("/new/path/a"));
      const action = await sagas.waitFor(HistoryActionType.HISTORY_UPDATED);
      expect(action).toEqual(historyUpdated(sagas.getState().history.location));
    });
  });

  describe("HISTORY_REPLACE action", () => {
    it("should update the history state if action is dispatched", () => {
      const onUpdate = jest.fn();
      const { sagas, history } = buildTestStore();

      history.listen(onUpdate);
      sagas.dispatch(historyReplace("/new/path"));
      expect(onUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: "/new/path" }),
        expect.anything(),
      );
    });

    it("should not push a location entry to history", () => {
      const { sagas, history } = buildTestStore();

      const entryCount = history.length;
      sagas.dispatch(historyReplace("/new/path"));
      expect(history.length).toEqual(entryCount);
    });
  });

  describe("HISTORY_GO action", () => {
    it("should update the history state if action is dispatched", () => {
      const { sagas, history } = buildTestStore();
      sagas.dispatch(historyPush("/new/a"));
      sagas.dispatch(historyPush("/new/b"));
      sagas.dispatch(historyPush("/new/c"));

      const onUpdate = jest.fn();
      history.listen(onUpdate);
      sagas.dispatch(historyGo(-2));

      expect(onUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: "/new/a" }),
        expect.anything(),
      );
    });

    it("should not push a location entry to history", () => {
      const { sagas, history } = buildTestStore();
      sagas.dispatch(historyPush("/new/a"));
      sagas.dispatch(historyPush("/new/b"));
      sagas.dispatch(historyPush("/new/c"));

      const entryCount = history.length;
      sagas.dispatch(historyGo(-2));
      expect(history.length).toEqual(entryCount);
    });
  });

  describe("HISTORY_BACK action", () => {
    it("should update the history state if action is dispatched", () => {
      const { sagas, history } = buildTestStore();
      sagas.dispatch(historyPush("/new/a"));
      sagas.dispatch(historyPush("/new/b"));
      sagas.dispatch(historyPush("/new/c"));

      const onUpdate = jest.fn();
      history.listen(onUpdate);
      sagas.dispatch(historyBack());

      expect(onUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: "/new/b" }),
        expect.anything(),
      );
    });

    it("should not push a location entry to history", () => {
      const { sagas, history } = buildTestStore();
      sagas.dispatch(historyPush("/new/a"));
      sagas.dispatch(historyPush("/new/b"));
      sagas.dispatch(historyPush("/new/c"));

      const entryCount = history.length;
      sagas.dispatch(historyBack());
      expect(history.length).toEqual(entryCount);
    });
  });

  describe("HISTORY_FORWARD action", () => {
    it("should update the history state if action is dispatched", () => {
      const { sagas, history } = buildTestStore();
      sagas.dispatch(historyPush("/new/a"));
      sagas.dispatch(historyPush("/new/b"));
      sagas.dispatch(historyBack());

      const onUpdate = jest.fn();
      history.listen(onUpdate);
      sagas.dispatch(historyForward());

      expect(onUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: "/new/b" }),
        expect.anything(),
      );
    });

    it("should not push a location entry to history", () => {
      const { sagas, history } = buildTestStore();
      sagas.dispatch(historyPush("/new/a"));
      sagas.dispatch(historyPush("/new/b"));
      sagas.dispatch(historyBack());

      const entryCount = history.length;
      sagas.dispatch(historyForward());
      expect(history.length).toEqual(entryCount);
    });
  });
});
