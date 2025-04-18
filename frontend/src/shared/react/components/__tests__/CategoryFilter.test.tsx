import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter, { CategoryType } from '../CategoryFilter';

describe('CategoryFilter', () => {
  const mockOnCategoryChange = jest.fn();
  
  beforeEach(() => {
    mockOnCategoryChange.mockClear();
  });

  it('renders all category buttons', () => {
    render(
      <CategoryFilter 
        activeCategory="all" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Horror')).toBeInTheDocument();
    expect(screen.getByText('Superhero')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
  });

  it('highlights the active category button', () => {
    render(
      <CategoryFilter 
        activeCategory="horror" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    const horrorButton = screen.getByText('Horror');
    const allButton = screen.getByText('All');
    
    // Check that the active button has the right styling classes
    expect(horrorButton.className).toContain('bg-zinc-800');
    expect(horrorButton.className).toContain('text-white');
    expect(allButton.className).not.toContain('bg-zinc-800');
    expect(allButton.className).toContain('text-zinc-400');
  });

  it('calls onCategoryChange when a category is clicked', () => {
    render(
      <CategoryFilter 
        activeCategory="all" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    // Click on the superhero category
    fireEvent.click(screen.getByText('Superhero'));
    
    // Check if the callback was called with the right category
    expect(mockOnCategoryChange).toHaveBeenCalledTimes(1);
    expect(mockOnCategoryChange).toHaveBeenCalledWith('superhero');
  });

  it('sets aria-current for the active category', () => {
    render(
      <CategoryFilter 
        activeCategory="scifi" 
        onCategoryChange={mockOnCategoryChange} 
      />
    );
    
    const scifiButton = screen.getByText('Sci-Fi');
    const allButton = screen.getByText('All');
    
    expect(scifiButton).toHaveAttribute('aria-current', 'page');
    expect(allButton).not.toHaveAttribute('aria-current', 'page');
  });
}); 