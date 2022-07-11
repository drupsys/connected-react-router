import { connect, MapDispatchToPropsParam} from "react-redux";
import History from "./History";
import IHistoryDispatchProps from "./IHistoryDispatchProps";
import IHistoryProps from "./IHistoryProps";
import { historyCreated, historyUpdated } from "./actions";

type DispatchType = MapDispatchToPropsParam<IHistoryDispatchProps, IHistoryProps>;
const mapDispatchToProps: DispatchType = (dispatch) => ({
  createHistory: (navigate) => dispatch(historyCreated(navigate)),
  updateHistory: (location) => dispatch(historyUpdated(location)),
});

export default connect(undefined, mapDispatchToProps)(History);
