import { useState } from 'react';
import { MovieDomainModel } from '../../core/entities/movies';

interface UseMovieCardPresenterProps {
  movie: MovieDomainModel.Movie;
  onPlay?: () => void;
  onMoreInfo?: () => void;
  isLoading?: boolean;
}

export function useMovieCardPresenter(props: UseMovieCardPresenterProps) {
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

  const handlePlayClick = () => {
    if (props.onPlay) {
      props.onPlay();
    }
  };

  const handleMoreInfoClick = () => {
    if (props.onMoreInfo) {
      props.onMoreInfo();
    }
  };

  // Determine if we should show the loading spinner
  const isShowingLoadingSpinner = !imageLoaded && !imageError && !props.isLoading;

  // Format the movie details for display
  const formattedDetails = {
    title: props.movie.title,
    releaseYear: props.movie.releaseDate,
    duration: props.movie.duration,
    rating: props.movie.voteAverage
  };

  return {
    movie: props.movie,
    isLoading: props.isLoading,
    imageLoaded,
    imageError,
    isShowingLoadingSpinner,
    formattedDetails,
    handleImageLoad,
    handleImageError,
    handlePlayClick,
    handleMoreInfoClick
  };
} 