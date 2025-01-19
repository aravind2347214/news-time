import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import  {store}  from "../../store/store";
import Home from "./Home";
import { describe, expect, it, vi } from "vitest";
import { beforeEach } from "vitest";

vi.mock(import("../../store/features/newsSlice"), async (importOriginal) => {
    const actual = await importOriginal()
    return {
      ...actual,
      fetchNewsByCategory: vi.fn(() => ({
        type: "news/fetchNewsByCategory/pending",
      })),
      searchNews: vi.fn(() => ({
        type: "news/searchNews/pending",
      }))
    }
  })

// Mock child components
vi.mock("../../components/NewsFilter/NewsFilter", () => ({
  NewsFilter: ({ newsCategories }: { newsCategories: string[] }) => (
    <div data-testid="news-filter">{newsCategories.join(", ")}</div>
  ),
}));

vi.mock("../../components/NewsList/NewsList", () => ({
  NewsList: ({ origin }: { origin: string }) => (
    <div data-testid="news-list">News List - {origin}</div>
  ),
}));

vi.mock("../../components/NewsHeader/NewsHeader", () => ({
  NewsHeader: ({ origin, title }: { origin: string; title: string }) => (
    <div data-testid="news-header">
      {title} - {origin}
    </div>
  ),
}));

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all child components", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByTestId("news-header")).toBeInTheDocument();
    expect(screen.getByTestId("news-filter")).toBeInTheDocument();
    expect(screen.getByTestId("news-list")).toBeInTheDocument();
  });

  it("displays correct title in header", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByTestId("news-header")).toHaveTextContent("News Time");
    expect(screen.getByTestId("news-header")).toHaveTextContent("home");
  });

  it("passes news categories to NewsFilter", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const newsFilterElement = screen.getByTestId("news-filter");
    expect(newsFilterElement).toHaveTextContent("general");
  });
});
