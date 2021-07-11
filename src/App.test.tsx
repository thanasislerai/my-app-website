import { render } from "@testing-library/react";

import App from "./App";

jest.mock("./routes/HomePage/Map", () => "MockMap");

test("renders as expected", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
