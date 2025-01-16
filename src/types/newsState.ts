import { News } from "./news";

export interface NewsState {
  articles: News[];
  loading: boolean;
  error: null | string;
  selectedCategory: string;
  searchQuery: string;
  searchResults:News[];
}