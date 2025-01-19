import { render, screen } from "@testing-library/react";
import NewsCard from "./NewsCard"; // Adjust the import path if necessary
import { describe, it, vi, beforeEach, expect } from "vitest";
import { News } from "../../types/news";
import moment from "moment";

// // Mock moment.js
// vi.mock("moment", () => {
//   return () => ({
//     fromNow: () => "5 minutes ago", // Mock date
//   });
// });

const mockNews: News = {
  title: "Sample News Title",
  description: "Sample description for the news article.",
  url: "https://example.com",
  urlToImage: "https://example.com/image.jpg",
  source: { name: "Example News Source" },
  publishedAt: "2025-01-17T12:00:00Z",
};

const mockHiddenNews: News = {
  title: "[Removed]",
  description: "[Removed]",
  url: "https://removed.com",
  urlToImage: "",
  source: { name: "[Removed]" },
  publishedAt: "2025-01-17T12:00:00Z",
};

describe("NewsCard", () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Clear all mocks between tests
  });

  it("renders the news details properly", () => {
    render(<NewsCard news={mockNews} />);

    // Check title
    const title = screen.getByTestId("news-title");
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(/Sample News Title/i)
    expect(title).toBeInTheDocument();

    // Check source
    const source = screen.getByTestId("news-source");
    expect(source).toBeInTheDocument()
    expect(source).toHaveTextContent(/Example News Source/i)
    expect(source).toBeInTheDocument();

    // Check description
    const description = screen.getByTestId("news-description");
    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent(/Sample description for the news article./i)
    expect(description).toBeInTheDocument();

    // Check published time
    const publishDate = screen.getByTestId("news-publish-date");
    expect(publishDate).toBeInTheDocument()
    expect(publishDate).toHaveTextContent(moment("2025-01-17T12:00:00Z").fromNow())
    expect(publishDate).toBeInTheDocument();
  });

  it("renders the image properly", async () => {
    render(<NewsCard news={mockNews} />);
    const img = screen.getByRole("img", { name: /news thumbnail image/i });
    expect(img).toBeInTheDocument();
  });

  it("does not render the card when all fields are removed", () => {
    render(<NewsCard news={mockHiddenNews} />);
    const link = screen.queryByRole("link");
    expect(link).not.toBeInTheDocument();
  });

  it("handles missing fields gracefully", () => {
    const incompleteNews = { ...mockNews, title: "", description: "", source: { name: "" } };
    render(<NewsCard news={incompleteNews} />);

    const titleFallback = screen.getByText(/title not available/i);
    const sourceFallback = screen.getByText(/source not available/i);
    const descriptionFallback = screen.getByText(/description not available/i);

    expect(titleFallback).toBeInTheDocument();
    expect(sourceFallback).toBeInTheDocument();
    expect(descriptionFallback).toBeInTheDocument();
  });

  it("applies the correct link behavior", () => {
    render(<NewsCard news={mockNews} />);

    const link = screen.getByRole("link", { name: /news article/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
