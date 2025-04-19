import { useState, useMemo } from 'react';
import { CategoryType } from '../sections/CategoryFilter';
import { dummyMovie, MovieDomainModel, moviesData } from '../../core/entities/movies';


export function useHomePresenter()  {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

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
    Object.keys(moviesData).forEach(category => {
      if (category === 'trending') return; // Skip trending as it's handled separately
      
      const baseMovies = moviesData[category];
      // Create a list of 20 movies by repeating the existing ones if needed
      result[category] = Array(20).fill(null).map((_, index) => {
        const originalIndex = index % baseMovies.length;
        return {
          ...baseMovies[originalIndex],
          id: baseMovies[originalIndex].id + Math.floor(index / baseMovies.length) // Create unique IDs
        };
      });
    });
    
    return result;
  }, []);

  // Filter categories based on active filter
  const shouldShowCategory = (category: string): boolean => {
    if (activeCategory === 'all') return true;
    return category === activeCategory;
  };

  return {
    dummyMovie,
    activeCategory,
    moviesData,
    expandedMovieList,
    shouldShowCategory,
    handleCategoryChange,
    handleWatchMovie,
    handlePlayTrailer,
    handleViewAllCategory,
    handleSelectMovie
  };
}