import { createSlice } from '@reduxjs/toolkit';
import { Movie } from '../../core/entities/movies';
import { fetchMovies } from '../usecases/fetchMovies.usecase';

export interface MoviesState {
  movies: Movie[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  currentRequestId: string | undefined;
}

const initialState: MoviesState = {
  movies: [],
  status: 'idle',
  error: null,
  currentRequestId: undefined,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Standard reducers can be added here if needed
    resetMovies: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        if (state.status === 'idle') {
          state.status = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'succeeded';
          state.movies = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to fetch movies';
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer; 