import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { NewsFilter } from "./NewsFilter";
import { store } from "../../store/store";


describe("NewsFilter Component", () => {
  


  it("renders all the categories provided", () => {
    const categories = ["technology", "health", "sports"];

    render(
      <Provider store={store}>
        <NewsFilter newsCategories={categories} />
      </Provider>
    );

    // Ensure all categories are rendered
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("highlights the selected category", () => {
    const categories = ["general", "technology", "sports"];

    render(
      <Provider store={store}>
        <NewsFilter newsCategories={categories} />
      </Provider>
    );

    // Check that the selected category is styled as "primary"
    const selectedCategoryButton = screen.getByRole("button",{name:"general"});
    expect(selectedCategoryButton).toHaveClass("bg-primaryBtn");

    // Check that other categories are styled as "outline"
    const otherCategoryButton = screen.getByRole("button",{name:"sports"});
    expect(otherCategoryButton).toHaveClass("border-outlineBtnHover");
  });


  it("highlights unselected category on hover", () => {
    const categories = ["general", "technology", "sports"];

    render(
      <Provider store={store}>
        <NewsFilter newsCategories={categories} />
      </Provider>
    );

    // Check that other categories are styled as "outline"
    const otherCategoryButton = screen.getByRole("button",{name:"sports"});
    expect(otherCategoryButton).toHaveClass("hover:bg-outlineBtnHover");
  });

});
