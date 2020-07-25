import React, { ReactNode } from "react";
import History from "../History";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

const withHistory = (Component: ReactNode) => render(<BrowserRouter>{Component}</BrowserRouter>);

describe("<History />", () => {
  it("should render provided children", () => {
    const { getByText } = withHistory(<History initialise={jest.fn()}><div>TEST</div></History>);
    expect(getByText("TEST")).toBeTruthy();
  });

  it("should render component with the specified children", () => {
    const initialiseCallback = jest.fn();
    withHistory(<History initialise={initialiseCallback}><div/></History>);
    expect(initialiseCallback).toHaveBeenCalled();
  });
});
