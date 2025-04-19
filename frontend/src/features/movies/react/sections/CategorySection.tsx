import React from 'react';
import { MovieDomainModel } from '../../core/entities/movies';
import MovieCard from './MovieCard';

interface CategorySectionProps {
  title: string;
  movies: MovieDomainModel.Movie[];
  onViewAll: () => void;
  onMovieClick: (movieId: number) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  movies,
  onViewAll,
  onMovieClick
}) => {
  // Check if this is an expanded category view (20 items)
  const isExpandedView = movies.length === 20;

  // For expanded view, organize movies into 4 rows of 5 items
  const movieRows = isExpandedView ? 
    Array(4).fill(null).map((_, rowIndex) => 
      movies.slice(rowIndex * 5, (rowIndex + 1) * 5)
    ) : 
    [movies];

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <button 
          className="inline-flex items-center gap-1 text-zinc-400 hover:text-white text-sm"
          onClick={onViewAll}
          aria-label={`View all ${title} movies`}
        >
          View All
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>

      {isExpandedView ? (
        // Expanded view layout (4 rows of 5 items)
        <div className="space-y-4">
          {movieRows.map((rowMovies, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-4">
              {rowMovies.map(movie => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onPlay={() => onMovieClick(movie.id)}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        // Regular responsive layout
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onPlay={() => onMovieClick(movie.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection; 