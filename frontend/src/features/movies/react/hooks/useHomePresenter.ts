import { useState, useMemo, useEffect } from 'react';
import { CategoryType } from '../sections/CategoryFilter';
import { MovieDomainModel } from '../../core/entities/movies';
import { fetchMovies } from '../../core/usecases/fetchMovies.usecase';
import { useAppDispatch, useAppSelector } from '@src/core/store/hooks';

export function useHomePresenter()  {
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  
  // Get movies from Redux store
  const { movies, status } = useAppSelector(state => state.movies);
  console.log('[DEBUG] movies', movies);
  
  // Initialize categories data structure
  const [categorizedMovies, setCategorizedMovies] = useState<Record<string, MovieDomainModel.Movie[]>>({
    trending: [],
    horror: [],
    superhero: [],
    scifi: []
  });
  
  // Get first movie as hero movie (previously dummyMovie)
  const heroMovie = movies.length > 0 ? movies[0] : null;

  // Fetch movies on component mount
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Categorize movies whenever movies array changes
  useEffect(() => {
    if (movies.length === 0) return;
    
    // Simple categorization logic (in real app, this would use actual categories from API)
    const result = {
      trending: movies.slice(0, 6),
      horror: movies.slice(6, 12),
      superhero: movies.slice(12, 18),
      scifi: movies.slice(18, 24)
    };
    
    setCategorizedMovies(result);
  }, [movies]);

  const handleWatchMovie = (movieId: number) => {
    console.log('Watch movie:', movieId);
    // Implement watch functionality
  };

  const handlePlayTrailer = (movieId: number) => {
    console.log('Play trailer:', movieId);
    // Implement trailer functionality
  };

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  const handleViewAllCategory = (category: string) => {
    console.log(`View all ${category} clicked`);
    // Implement view all functionality
  };

  const handleSelectMovie = (movieId: number) => {
    console.log(`Movie clicked: ${movieId}`);
    // Implement movie click functionality
  };

  // Create expanded movie lists for category view (4 rows of 5 items)
  const expandedMovieList = useMemo(() => {
    const result: Record<string, MovieDomainModel.Movie[]> = {};
    
    // For each category, generate a list of 20 movies (or duplicate existing ones)
    Object.keys(categorizedMovies).forEach(category => {
      if (category === 'trending') return; // Skip trending as it's handled separately
      
      const baseMovies = categorizedMovies[category];
      // Create a list of 20 movies by repeating the existing ones if needed
      result[category] = Array(20).fill(null).map((_, index) => {
        if (baseMovies.length === 0) return null;
        const originalIndex = index % baseMovies.length;
        return {
          ...baseMovies[originalIndex],
          id: baseMovies[originalIndex].id + Math.floor(index / baseMovies.length) * 1000 // Create unique IDs
        };
      }).filter(Boolean) as MovieDomainModel.Movie[];
    });
    
    return result;
  }, [categorizedMovies]);

  // Filter categories based on active filter
  const shouldShowCategory = (category: string): boolean => {
    if (activeCategory === 'all') return true;
    return category === activeCategory;
  };

  return {
    dummyMovie: heroMovie, // Keep the same prop name for backwards compatibility
    activeCategory,
    moviesData: categorizedMovies, // Keep the same prop name for backwards compatibility
    expandedMovieList,
    shouldShowCategory,
    handleCategoryChange,
    handleWatchMovie,
    handlePlayTrailer,
    handleViewAllCategory,
    handleSelectMovie,
    isLoading: status === 'pending'
  };
}