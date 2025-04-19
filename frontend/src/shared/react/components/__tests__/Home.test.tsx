import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Home from '../Home';

// Mock des composants enfants
vi.mock('../HeroSection', () => {
  return {
    default: function MockHeroSection({ movie, onWatch, onTrailer }: any) {
      return (
        <div data-testid="hero-section">
          <h1>{movie.title}</h1>
          <button onClick={onWatch} data-testid="watch-button">Watch Now</button>
          <button onClick={onTrailer} data-testid="trailer-button">Trailer</button>
        </div>
      );
    }
  };
});

vi.mock('../CategoryFilter', () => {
  return {
    default: function MockCategoryFilter({ activeCategory, onCategoryChange }: any) {
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
    }
  };
});

vi.mock('../CategorySection', () => {
  return {
    default: function MockCategorySection({ title, movies, onViewAll, onMovieClick }: any) {
      const testIdTitle = title.toLowerCase();
      return (
        <div data-testid={`category-section-${testIdTitle}`}>
          <h2>{title}</h2>
          <button onClick={onViewAll} data-testid={`view-all-${testIdTitle}`}>
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
    }
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
    expect(screen.getByTestId('category-section-trending now')).toBeInTheDocument();
    expect(screen.getByTestId('category-section-sci-fi')).toBeInTheDocument();
  });

  it('filters category sections when a specific category is selected', () => {
    render(<Home />);
    
    // Click on Horror category
    fireEvent.click(screen.getByTestId('category-horror'));
    
    // In the new implementation, when a specific category is selected,
    // only that category is shown in expanded view (not Trending)
    expect(screen.getByTestId('category-section-horror')).toBeInTheDocument();
    
    // Other categories should not be visible
    expect(screen.queryByTestId('category-section-superhero')).not.toBeInTheDocument();
    expect(screen.queryByTestId('category-section-trending now')).not.toBeInTheDocument();
    expect(screen.queryByTestId('category-section-sci-fi')).not.toBeInTheDocument();
  });

  it('handles movie click correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<Home />);
    
    // Click on the first horror movie - note the ID could be h1 or h1-0 depending on view
    // Try both selectors
    const movieElement = screen.queryByTestId('movie-h1') || screen.queryByTestId('movie-h1-0');
    expect(movieElement).not.toBeNull();
    fireEvent.click(movieElement!);
    
    // The message contains either h1 or h1-0
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy.mock.calls[0][0]).toContain('Movie clicked: h1');
    consoleSpy.mockRestore();
  });

  it('handles "View All" click correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<Home />);
    
    // Click on the View All button for Horror
    fireEvent.click(screen.getByTestId('view-all-horror'));
    
    expect(consoleSpy).toHaveBeenCalledWith('View all horror clicked');
    consoleSpy.mockRestore();
  });
}); 