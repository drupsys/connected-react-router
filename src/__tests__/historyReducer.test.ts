import { createMemoryHistory } from "history";
import historyReducer from "../historyReducer";
import { createHistoryState, createLocationState } from "../utils";
import { historyCreated, historyUpdated, historyPush } from "../actions";

describe("historyReducer.ts", () => {
  it("should update location on BOOTSTRAP_HISTORY_CREATED action", () => {
    const history = createMemoryHistory();
    history.push("/page/comments");
    const state = historyReducer(createHistoryState(), historyCreated(history));

    expect(state).toHaveProperty("location", history.location);
  });

  it("should update location on HISTORY_UPDATED action", () => {
    const location = createLocationState({ pathname: "/page/comments" });
    const state = historyReducer(createHistoryState(), historyUpdated(location));
    expect(state).toHaveProperty("location.pathname", "/page/comments");
  });

  it("should not change state on unknown action", () => {
    const state = createHistoryState({
      location: createLocationState({pathname: "/page/comments"}),
    });

    const newState = historyReducer(state, historyPush(""));
    expect(newState).toHaveProperty("location.pathname", "/page/comments");
  });
});
