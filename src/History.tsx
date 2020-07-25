import React, { Fragment, FunctionComponent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import IHistoryDispatchProps from "./IHistoryDispatchProps";
import IHistoryProps from "./IHistoryProps";

type ComponentType = FunctionComponent<IHistoryProps & IHistoryDispatchProps>;
const History: ComponentType = ({ children, initialise }) => {
  const history = useHistory();
  useEffect(() => {
    initialise(history);
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default History;
