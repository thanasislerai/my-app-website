import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import App from "./App";
import { mockUser } from "./mocks/user";
import { RootState } from "./store/configure";

const mockStore = configureStore<RootState>();

jest.mock("./routes/HomePage/Map", () => "MockMap");

describe("App", () => {
  let element: HTMLElement;
  beforeEach(() => {
    const store = mockStore({
      theme: {
        type: "dark",
      },
      user: {
        userInfo: mockUser,
        loading: false,
        error: null,
      },
    });

    store.dispatch = jest.fn();

    element = render(
      <Provider store={store}>
        <App />
      </Provider>
    ).container;
  });

  it("renders as expected", () => {
    expect(element).toMatchSnapshot();
  });
});
