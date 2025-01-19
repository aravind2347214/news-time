import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import NewsSearch from "./NewsSearch";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter } from "react-router";



describe("News Search", () => {


  it("renders search bar elements", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewsSearch origin="home" />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByRole("textbox", { name: "search input" });
    const searchButton = screen.getByRole("button", { name: "search button" });

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it(" renders search bar with appropriate style", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewsSearch origin="home" />
        </MemoryRouter>
      </Provider>
    );

    const searchContainer = screen.getByRole("generic", {
      name: "search container",
    });

    expect(searchContainer).toBeInTheDocument();
    expect(searchContainer).toHaveClass(
      "flex flex-row justify-between items-center p-2 pl-6 bg-[#bababa3d] rounded-full w-full lg:w-4/6"
    );
  });
});
