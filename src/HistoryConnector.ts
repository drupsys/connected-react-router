import { connect, MapDispatchToPropsParam} from "react-redux";
import History from "./History";
import IHistoryDispatchProps from "./IHistoryDispatchProps";
import IHistoryProps from "./IHistoryProps";
import { historyCreated } from "./actions";

type DispatchType = MapDispatchToPropsParam<IHistoryDispatchProps, IHistoryProps>;
const mapDispatchToProps: DispatchType = (dispatch) => ({
  initialise: (history) => dispatch(historyCreated(history)),
});

export default connect(undefined, mapDispatchToProps)(History);
