import { createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from '../entities/movies';
import { Dependencies } from '@src/app/dependencies';
import { RootState } from '@src/core/store';

/**
 * Async thunk to fetch movies using the httpClient dependency
 */
export const fetchMovies = createAsyncThunk<
  Movie[],
  string | undefined,
  {
    state: RootState;
    extra: Dependencies;
  }
>('movies/fetchNowPlayingMovies', async (category, { extra, rejectWithValue }) => {
  try {
    // Get the httpClient from extra argument (dependencies) instead of state
    const { httpClient } = extra;
    
    // Construct the URL based on the optional category
    const url = category 
      ? `/movie/now_playing?category=${encodeURIComponent(category)}` 
      : '/movie/now_playing';
     
    // Make the GET request using the httpClient
    const response = await httpClient.get<Movie[]>(url);
    // Return the movies array from the response, not the whole response
    return response;
  } catch (error) {
    // Handle errors and transform them for Redux
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred while fetching movies');
  }
}); 