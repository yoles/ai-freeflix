import React from 'react';
import MovieCard from './MovieCard';

export interface Movie {
  id: string;
  title: string;
  thumbnailUrl: string;
  year: number;
  duration: string;
  rating: string;
  genres: string[];
}

interface CategorySectionProps {
  title: string;
  movies: Movie[];
  onViewAll: () => void;
  onMovieClick: (movieId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  movies,
  onViewAll,
  onMovieClick
}) => {
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onPlay={() => onMovieClick(movie.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection; 