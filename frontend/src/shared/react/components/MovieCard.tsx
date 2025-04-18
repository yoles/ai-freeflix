import React, { useState } from 'react';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    thumbnailUrl: string;
    year: number;
    duration: string;
    rating: string;
    genres: string[];
  };
  onPlay?: () => void;
  onMoreInfo?: () => void;
  isLoading?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPlay,
  isLoading = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackImage = '/placeholder-movie.jpg';

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    e.currentTarget.src = fallbackImage;
  };

  if (isLoading) {
    return (
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-1000" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative transition-transform duration-300 ease-in-out">
      <div 
        onClick={onPlay} 
        className="block aspect-[2/3] overflow-hidden rounded-md cursor-pointer relative"
      >
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={movie.thumbnailUrl}
          alt={movie.title}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-medium text-white text-base group-hover:text-lg transition-all">{movie.title}</h3>
          <p className="text-xs group-hover:text-sm text-zinc-400 transition-all">{movie.year} • {movie.duration}</p>
          {movie.rating && <p className="text-xs group-hover:text-sm text-yellow-500 mt-1 transition-all">{movie.rating} ★</p>}
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 