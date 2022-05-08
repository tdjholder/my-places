import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders continents", () => {
  render(<App />);
  const continentElement = screen.getByText("Africa");
  expect(continentElement).toBeInTheDocument();
});
