import { Location } from "history";
import { NavigateFunction } from "react-router-dom";

interface IHistoryDispatchProps {
  createHistory(navigate: NavigateFunction): void
  updateHistory(location: Location): void
}

export default IHistoryDispatchProps;
