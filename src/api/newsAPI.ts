import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// Configure axios defaults for headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY
  }
});


export const fetchNewsByCategory = createAsyncThunk(
  'news/fetchByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/top-headlines', {
        params: {
          category,
        },
      });
      if (response.data.articles.length === 0) {
        return rejectWithValue('No news found for this category');
      }
      return response.data.articles;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch news');
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

export const searchNews = createAsyncThunk(
  'news/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/everything', {
        params: {
          q: query,
        },
      });
      if (response.data.articles.length === 0) {  
        return rejectWithValue('No results found for your search');
      }
      return response.data.articles;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch news');
      }
      return rejectWithValue('Something went wrong');
    }
  }
);