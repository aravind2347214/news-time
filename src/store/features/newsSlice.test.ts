import { describe, it, expect, beforeEach } from 'vitest';
import newsReducer, { setCategory, setSearchQuery, setSearchResults } from './newsSlice';
import { fetchNewsByCategory, searchNews } from '../../api/newsAPI';

describe('news reducer', () => {
  const initialState = {
    articles: [],
    loading: false,
    error: null,
    selectedCategory: "general",
    searchQuery: "",
    searchResults: [],
  };

  beforeEach(() => {
    // Reset any mocks before each test
  });

  it('should return the initial state', () => {
    expect(newsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('synchronous actions', () => {
    it('should handle setCategory', () => {
      const category = 'technology';
      const nextState = newsReducer(initialState, setCategory(category));
      
      expect(nextState.selectedCategory).toBe(category);
      expect(nextState.searchQuery).toBe(''); // Should reset search query
    });

    it('should handle setSearchQuery', () => {
      const query = 'test query';
      const nextState = newsReducer(initialState, setSearchQuery(query));
      
      expect(nextState.searchQuery).toBe(query);
    });

    it('should handle setSearchResults', () => {
      const results = [{ id: 1, title: 'Test Article' }];
      const nextState = newsReducer(initialState, setSearchResults(results));
      
      expect(nextState.searchResults).toEqual(results);
    });
  });

  describe('async actions - fetchNewsByCategory', () => {
    it('should handle pending state', () => {
      const nextState = newsReducer(initialState, fetchNewsByCategory.pending('', 'technology'));
      
      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle fulfilled state', () => {
      const articles = [{ id: 1, title: 'Test Article' }];
      const nextState = newsReducer(
        { ...initialState, loading: true },
        fetchNewsByCategory.fulfilled(articles, '', 'technology')
      );
      
      expect(nextState.loading).toBe(false);
      expect(nextState.articles).toEqual(articles);
      expect(nextState.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const error = 'Failed to fetch news';
      const nextState = newsReducer(
        { ...initialState, loading: true },
        fetchNewsByCategory.rejected(new Error(error), '', 'technology')
      );
      
      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(error);
    });
  });

  describe('async actions - searchNews', () => {
    it('should handle pending state', () => {
      const nextState = newsReducer(initialState, searchNews.pending('', 'test query'));
      
      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should handle fulfilled state', () => {
      const searchResults = [{ id: 1, title: 'Search Result' }];
      const nextState = newsReducer(
        { ...initialState, loading: true },
        searchNews.fulfilled(searchResults, '', 'test query')
      );
      
      expect(nextState.loading).toBe(false);
      expect(nextState.searchResults).toEqual(searchResults);
      expect(nextState.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const error = 'Search failed';
      const nextState = newsReducer(
        { ...initialState, loading: true },
        searchNews.rejected(new Error(error), '', 'test query')
      );
      
      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(error);
    });
  });

  describe('complex state changes', () => {
    it('should handle category change while searching', () => {
      // Start with some search results and query
      let state = newsReducer(initialState, setSearchQuery('initial search'));
      state = newsReducer(state, setSearchResults([{ id: 1, title: 'Initial Result' }]));
      
      // Change category
      state = newsReducer(state, setCategory('technology'));
      
      expect(state.selectedCategory).toBe('technology');
      expect(state.searchQuery).toBe(''); // Should be reset
      expect(state.searchResults).toHaveLength(1); // Should preserve results
    });

    it('should preserve state between different actions', () => {
      let state = newsReducer(initialState, setCategory('technology'));
      state = newsReducer(state, setSearchQuery('test'));
      
      // Simulate loading state
      state = newsReducer(state, searchNews.pending('', 'test'));
      
      expect(state.selectedCategory).toBe('technology');
      expect(state.searchQuery).toBe('test');
      expect(state.loading).toBe(true);
    });
  });
});