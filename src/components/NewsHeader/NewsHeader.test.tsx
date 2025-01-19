import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { NewsHeader } from "./NewsHeader";
import { store } from "../../store/store";


describe("NewsHeader Component", () => {
//   const mockNavigate = vi.fn();

//   vi.mock("react-router", () => ({
//     useNavigate: () => mockNavigate,
//   }));

 

  it("renders the app logo and title", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewsHeader title="NewsTime" origin="home" />
        </MemoryRouter>
      </Provider>
    );

    const logo = screen.getByRole("img", { name: /app-logo/i });
    expect(logo).toBeInTheDocument();
    const title = screen.getByRole("heading", { name: /app-title/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/NewsTime/i)
  });

  it("renders the back button when origin is 'search'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewsHeader title="NewsTime" origin="search" />
        </MemoryRouter>
      </Provider>
    );

    const backButton = screen.getByRole("button", { name: /back button/i });
    expect(backButton).toBeInTheDocument();
  });

  it("does not render the back button when origin is 'home'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewsHeader title="NewsTime" origin="home" />
        </MemoryRouter>
      </Provider>
    );

    const backButton = screen.queryByRole("button", { name: /back button/i });
    expect(backButton).not.toBeInTheDocument();
  });


  it("renders the NewsSearch component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewsHeader title="NewsTime" origin="search" />
        </MemoryRouter>
      </Provider>
    );

    const searchComponent = screen.getByRole("textbox", {
      name: /search input/i,
    });
    expect(searchComponent).toBeInTheDocument();
  });

  it("applies the correct layout when origin is 'search'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewsHeader title="NewsTime" origin="search" />
        </MemoryRouter>
      </Provider>
    );

    const header = screen.getByRole("banner", { name: /app header/i });
    expect(header).toHaveClass("flex flex-col xs:flex-row gap-5");
  });

  it("applies the correct layout when origin is 'home'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewsHeader title="NewsTime" origin="home" />
        </MemoryRouter>
      </Provider>
    );

    const header = screen.getByRole("banner", { name: /app header/i });
    expect(header).toHaveClass("flex flex-col xs:flex-row gap-5");
  });
});
