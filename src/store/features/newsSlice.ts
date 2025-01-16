import { createSlice } from "@reduxjs/toolkit";
import { NewsState } from "../../types/newsState";
import { fetchNewsByCategory, searchNews } from "../../api/newsAPI";

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  selectedCategory: "general",
  searchQuery: "",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.searchQuery = ""; // Reset search when changing category
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(searchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setCategory, setSearchQuery } = newsSlice.actions;
export default newsSlice.reducer;
