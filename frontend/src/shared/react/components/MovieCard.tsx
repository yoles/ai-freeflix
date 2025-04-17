import React, { useState } from 'react';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import Button from './Button';

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
  onMoreInfo,
  isLoading = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
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
      <div className="relative aspect-video rounded-md overflow-hidden bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Card */}
      <div className="relative aspect-video rounded-md overflow-hidden bg-gray-900">
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
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Hover Content */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/80 rounded-md p-4 flex flex-col justify-between transition-opacity duration-300">
          <div>
            {/* Title and Actions */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium truncate pr-2">{movie.title}</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="small"
                  icon={<FaPlay />}
                  onClick={onPlay}
                >
                  Play
                </Button>
                <Button
                  variant="outline"
                  size="small"
                  icon={<FaPlus />}
                  onClick={() => {}}
                  className="p-1.5"
                  aria-label="Add to My List"
                />
                <Button
                  variant="outline"
                  size="small"
                  icon={<FaThumbsUp />}
                  onClick={() => {}}
                  className="p-1.5"
                  aria-label="Like"
                />
                <Button
                  variant="outline"
                  size="small"
                  icon={<FaChevronDown />}
                  onClick={onMoreInfo}
                  className="p-1.5"
                  aria-label="More Info"
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="grid grid-cols-2 gap-x-4 text-sm">
              <div className="text-green-500 font-medium">{movie.rating} Rating</div>
              <div>{movie.year}</div>
              <div>{movie.duration}</div>
            </div>

            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre, index) => (
                <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard; 