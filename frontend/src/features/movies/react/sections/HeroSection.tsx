import React from 'react';
import Button from '@src/shared/react/components/Button';
import { MovieDomainModel } from '../../core/entities/movies';

interface HeroSectionProps {
  movie: MovieDomainModel.Movie;
  onWatch?: () => void;
  onTrailer?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  movie,
  onWatch = () => {},
  onTrailer = () => {},
}) => {
  return (
    <section className="relative -mt-20">
      {/* Gradient overlays for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/15 to-transparent z-10"></div>
      
      {/* Hero background image */}
      {/* 4rem = (0.25rem*16) = height of header */}
      <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
        <img 
          src={movie.imageURL} 
          alt={movie.title}
          className="object-cover object-center w-full h-full"
        />
        
        {/* Movie information overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 lg:p-16 space-y-4">
          {movie.isNewRelease && (
            <span className="inline-block bg-red-600 hover:bg-red-700 text-white px-2.5 py-0.5 rounded-full text-xs font-medium">
              New Release
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            {movie.title}
            {movie.subtitle && (
              <span className="block text-2xl md:text-3xl mt-1 text-zinc-300">
                {movie.subtitle}
              </span>
            )}
          </h1>
          
          {/* Movie metadata */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-400">
            {movie.genres?.map((genre, index) => (
              <React.Fragment key={genre}>
                <span>{genre}</span>
                {index < (movie.genres?.length || 0) - 1 && <span>•</span>}
              </React.Fragment>
            ))}
            {movie.duration && (
              <>
                <span>•</span>
                <span>{movie.duration}</span>
              </>
            )}
          </div>
          
          {/* Movie description */}
          <p className="max-w-xl text-zinc-300">
            {movie.overview}
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button 
              variant="primary" 
              onClick={onWatch}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Watch Now
            </Button>
            <Button
              variant="outline"
              onClick={onTrailer}
              className="border border-zinc-700 text-white hover:bg-zinc-800 px-4 py-2 rounded-md"
            >
              Trailer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 