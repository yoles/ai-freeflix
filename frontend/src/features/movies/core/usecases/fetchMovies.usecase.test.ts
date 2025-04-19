import { HttpSuccessStubAdapter, HttpFailStubAdapter } from '@src/core/adapters';
import { fetchMovies } from './fetchMovies.usecase';
import { createTestStore } from '@src/testing/tests-environment';

describe('fetchMovies thunk', () => {
  // Test with success stub
  describe('with success stub', () => {
    const mockMovies = [
      { 
        id: 1, 
        title: 'Test Movie', 
        originalTitle: 'Test Movie Original',
        overview: 'Test overview',
        imageURL: 'test-image.jpg',
        releaseDate: '2023',
        voteAverage: 8.5,
        adult: false,
      }
    ];

    // Create store with success stub
    const store = createTestStore({
      dependencies: {
        httpClient: new HttpSuccessStubAdapter(mockMovies)
      }
    });

    it('should change status from idle to succeeded when fetch succeeds', async () => {
      // Initial state should be idle
      const initialState = store.getState();
      expect(initialState.movies.status).toBe('idle');
      
      // Dispatch the thunk action
      const promise = store.dispatch(fetchMovies());
      expect(store.getState().movies.status).toBe('pending');
      await promise;
      
      // Check the updated state
      const moviesState = store.getState().movies;
      expect(moviesState.status).toBe('succeeded');
      expect(moviesState.movies).toEqual(mockMovies);
      expect(moviesState.error).toBeNull();
    });
  });

  // Test with failure stub
  describe('with fail stub', () => {
    const errorMessage = 'Network error during fetch';

    // Create store with fail stub
    const store = createTestStore({
      dependencies: {
        httpClient: new HttpFailStubAdapter(errorMessage)
      }
    });

    it('should change status from idle to failed when fetch fails', async () => {
      // Initial state should be idle
      const initialState = store.getState();
      expect(initialState.movies.status).toBe('idle');
      
      // Dispatch the thunk action
      await store.dispatch(fetchMovies());
      
      // Check the updated state
      const moviesState = store.getState().movies;
      expect(moviesState.status).toBe('failed');
      expect(moviesState.movies).toEqual([]);
      expect(moviesState.error).toBeTruthy(); // The error message might be wrapped by Redux
    });
  });
}); 