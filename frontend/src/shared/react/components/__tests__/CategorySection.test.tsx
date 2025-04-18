import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategorySection, { Movie } from '../CategorySection';

// Mocking the MovieCard component to simplify testing
jest.mock('../MovieCard', () => {
  return function MockMovieCard({ movie, onPlay }: { movie: Movie; onPlay: () => void }) {
    return (
      <div data-testid={`movie-card-${movie.id}`} onClick={onPlay}>
        {movie.title}
      </div>
    );
  };
});

describe('CategorySection', () => {
  const mockMovies: Movie[] = [
    {
      id: '1',
      title: 'Test Movie 1',
      thumbnailUrl: '/test1.jpg',
      year: 2023,
      duration: '2h 15m',
      rating: 'PG-13',
      genres: ['Action', 'Adventure']
    },
    {
      id: '2',
      title: 'Test Movie 2',
      thumbnailUrl: '/test2.jpg',
      year: 2022,
      duration: '1h 45m',
      rating: 'R',
      genres: ['Horror']
    }
  ];

  const mockOnViewAll = jest.fn();
  const mockOnMovieClick = jest.fn();

  beforeEach(() => {
    mockOnViewAll.mockClear();
    mockOnMovieClick.mockClear();
  });

  it('renders the category title', () => {
    render(
      <CategorySection
        title="Horror Movies"
        movies={mockMovies}
        onViewAll={mockOnViewAll}
        onMovieClick={mockOnMovieClick}
      />
    );

    expect(screen.getByText('Horror Movies')).toBeInTheDocument();
  });

  it('renders the "View All" button', () => {
    render(
      <CategorySection
        title="Action Movies"
        movies={mockMovies}
        onViewAll={mockOnViewAll}
        onMovieClick={mockOnMovieClick}
      />
    );

    const viewAllButton = screen.getByText('View All');
    expect(viewAllButton).toBeInTheDocument();
    
    // The button should have an accessible label
    expect(viewAllButton).toHaveAccessibleName('View all Action Movies movies');
  });

  it('calls onViewAll when the button is clicked', () => {
    render(
      <CategorySection
        title="Action Movies"
        movies={mockMovies}
        onViewAll={mockOnViewAll}
        onMovieClick={mockOnMovieClick}
      />
    );

    fireEvent.click(screen.getByText('View All'));
    expect(mockOnViewAll).toHaveBeenCalledTimes(1);
  });

  it('renders movie cards for each movie', () => {
    render(
      <CategorySection
        title="Action Movies"
        movies={mockMovies}
        onViewAll={mockOnViewAll}
        onMovieClick={mockOnMovieClick}
      />
    );

    expect(screen.getByTestId('movie-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-card-2')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
  });

  it('calls onMovieClick with movie id when a movie card is clicked', () => {
    render(
      <CategorySection
        title="Action Movies"
        movies={mockMovies}
        onViewAll={mockOnViewAll}
        onMovieClick={mockOnMovieClick}
      />
    );

    fireEvent.click(screen.getByTestId('movie-card-1'));
    expect(mockOnMovieClick).toHaveBeenCalledWith('1');
  });
}); 