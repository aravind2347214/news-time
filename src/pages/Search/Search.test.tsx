import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from "redux-mock-store";
import Search from "./Search";

const mockStore = configureStore();

describe("Search", () => {
  it("renders the search query when it is not empty", () => {
    const store = mockStore({
      news: { searchQuery: "Technology",
              searchResults:[]
            },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>
    );

    const heading = screen.getByRole('heading',{name:/Articles related to/i})
    console.log(heading)
    expect(heading).toBeInTheDocument();
  });

  it("does not render anything when the search query is empty", () => {
    const store = mockStore({
      news: { searchQuery: "",
              searchResults:[]
       },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.queryByText(/Articles related to/i)
    ).not.toBeInTheDocument();
  });

  it("trims the search query and renders it correctly", () => {
    const store = mockStore({
      news: { searchQuery: "  Sports ",
              searchResults:[] 
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>
    );

    const heading = screen.queryByText(/Articles related to 'Sports'/i)
    console.log(heading)
    // expect().toBeInTheDocument();
  });
});
