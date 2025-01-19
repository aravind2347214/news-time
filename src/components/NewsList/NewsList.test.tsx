import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { NewsList } from "./NewsList";
import { expect, vi } from "vitest";
import { describe, it } from "vitest";
import { News } from "../../types/news";

// Create mock store
const mockStore = configureStore([]);

// Mock data
const mockArticles :News[] = [
  {
    title: "Test Article 1",
    description: "Test Description 1",
    url: "http://test1.com",
    source: { name: "Source 1" },
    urlToImage: "http://test1.com/image.jpg",
    publishedAt: "2024-01-19T00:00:00Z"
  },
  {
    title: "Test Article 2",
    description: "Test Description 2",
    url: "http://test2.com",
    source: { name: "Source 2" },
    urlToImage: "http://test2.com/image.jpg",
    publishedAt: "2024-01-19T00:00:00Z"
  }
];

// Mock NewsCard component
vi.mock("../NewsCard/NewsCard", () => ({
  default: ({ news }: { news: News }) => <div data-testid="news-card">{news.title}</div>
}));

// Mock LoadingShimmer component
vi.mock("../LoadingShimmer/LoadingShimmer", () => ({
  default: ({ count }: { count: number }) => <div data-testid="loader">Loading {count} loaders...</div>
}));

describe("NewsList", () => {
  it("shows loading shimmer when loading is true", () => {
    const store = mockStore({
      news: {
        loading: true,
        articles: [],
        error: null,
        searchQuery: "",
        searchResults: []
      }
    });

    render(
      <Provider store={store}>
        <NewsList origin="home" />
      </Provider>
    );


    const loader = screen.getByTestId("loader")
    console.log(loader)
    expect(loader).toBeInTheDocument();
  });

  it("shows error message when search fails", () => {
    const store = mockStore({
      news: {
        loading: false,
        articles: [],
        error: "Error message",
        searchQuery: "test query",
        searchResults: []
      }
    });

    render(
      <Provider store={store}>
        <NewsList origin="search" />
      </Provider>
    );

    expect(screen.getByLabelText("search result failed")).toBeInTheDocument();
    expect(screen.getByLabelText("search result failed message")).toHaveTextContent('No Articles on "test query"');
  });

  it("renders articles when origin is home", () => {
    const store = mockStore({
      news: {
        loading: false,
        articles: mockArticles,
        error: null,
        searchQuery: "",
        searchResults: []
      }
    });

    render(
      <Provider store={store}>
        <NewsList origin="home" />
      </Provider>
    );

    expect(screen.getByLabelText("news list")).toBeInTheDocument();
    expect(screen.getAllByTestId("news-card")).toHaveLength(2);
  });

  it("renders search results when origin is search", () => {
    const store = mockStore({
      news: {
        loading: false,
        articles: [],
        error: null,
        searchQuery: "test",
        searchResults: mockArticles
      }
    });

    render(
      <Provider store={store}>
        <NewsList origin="search" />
      </Provider>
    );

    expect(screen.getByLabelText("news list")).toBeInTheDocument();
    expect(screen.getAllByTestId("news-card")).toHaveLength(2);
  });

});