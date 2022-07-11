import React, { Fragment, FunctionComponent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IHistoryDispatchProps from "./IHistoryDispatchProps";
import IHistoryProps from "./IHistoryProps";

type ComponentType = FunctionComponent<IHistoryProps & IHistoryDispatchProps>;
const History: ComponentType = ({ children, createHistory, updateHistory }) => {
  updateHistory(useLocation());

  const navigate = useNavigate();
  useEffect(() => {
    createHistory(navigate);
  }, [])

  return <Fragment>{children}</Fragment>;
};

export default History;
