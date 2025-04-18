import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../Home';

// Mock des composants enfants
jest.mock('../HeroSection', () => {
  return function MockHeroSection({ movie, onWatch, onTrailer }: any) {
    return (
      <div data-testid="hero-section">
        <h1>{movie.title}</h1>
        <button onClick={onWatch} data-testid="watch-button">Watch Now</button>
        <button onClick={onTrailer} data-testid="trailer-button">Trailer</button>
      </div>
    );
  };
});

jest.mock('../CategoryFilter', () => {
  return function MockCategoryFilter({ activeCategory, onCategoryChange }: any) {
    return (
      <div data-testid="category-filter">
        <button 
          data-testid="category-all" 
          className={activeCategory === 'all' ? 'active' : ''}
          onClick={() => onCategoryChange('all')}
        >
          All
        </button>
        <button 
          data-testid="category-horror" 
          className={activeCategory === 'horror' ? 'active' : ''}
          onClick={() => onCategoryChange('horror')}
        >
          Horror
        </button>
      </div>
    );
  };
});

jest.mock('../CategorySection', () => {
  return function MockCategorySection({ title, movies, onViewAll, onMovieClick }: any) {
    return (
      <div data-testid={`category-section-${title.toLowerCase()}`}>
        <h2>{title}</h2>
        <button onClick={onViewAll} data-testid={`view-all-${title.toLowerCase()}`}>
          View All
        </button>
        <div className="movies">
          {movies.map((movie: any) => (
            <div 
              key={movie.id} 
              data-testid={`movie-${movie.id}`}
              onClick={() => onMovieClick(movie.id)}
            >
              {movie.title}
            </div>
          ))}
        </div>
      </div>
    );
  };
});

describe('Home Component', () => {
  it('renders hero section with Venom movie', () => {
    render(<Home />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByText('VENOM')).toBeInTheDocument();
  });

  it('renders category filter with "all" selected by default', () => {
    render(<Home />);
    expect(screen.getByTestId('category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('category-all').className).toContain('active');
  });

  it('renders all category sections when "all" is selected', () => {
    render(<Home />);
    expect(screen.getByTestId('category-section-horror')).toBeInTheDocument();
    expect(screen.getByTestId('category-section-superhero')).toBeInTheDocument();
    expect(screen.getByTestId('category-section-trending')).toBeInTheDocument();
    expect(screen.getByTestId('category-section-sci-fi')).toBeInTheDocument();
  });

  it('filters category sections when a specific category is selected', () => {
    render(<Home />);
    
    // Click on Horror category
    fireEvent.click(screen.getByTestId('category-horror'));
    
    // Only Horror and Trending should be visible
    expect(screen.getByTestId('category-section-horror')).toBeInTheDocument();
    expect(screen.getByTestId('category-section-trending')).toBeInTheDocument();
    
    // Other categories should not be visible
    expect(screen.queryByTestId('category-section-superhero')).not.toBeInTheDocument();
    expect(screen.queryByTestId('category-section-sci-fi')).not.toBeInTheDocument();
  });

  it('handles movie click correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Home />);
    
    // Click on the first horror movie
    fireEvent.click(screen.getByTestId('movie-h1'));
    
    expect(consoleSpy).toHaveBeenCalledWith('Movie clicked: h1');
    consoleSpy.mockRestore();
  });

  it('handles "View All" click correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Home />);
    
    // Click on the View All button for Horror
    fireEvent.click(screen.getByTestId('view-all-horror'));
    
    expect(consoleSpy).toHaveBeenCalledWith('View all horror clicked');
    consoleSpy.mockRestore();
  });
}); 