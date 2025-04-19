import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CategoryFilter from '../CategoryFilter';

describe('CategoryFilter', () => {
  it('renders all category buttons', () => {
    render(
      <CategoryFilter 
        activeCategory="all" 
        onCategoryChange={() => {}} 
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
        onCategoryChange={() => {}} 
      />
    );
    
    const horrorButton = screen.getByText('Horror');
    const allButton = screen.getByText('All');
    
    expect(horrorButton.className).toContain('bg-zinc-800');
    expect(horrorButton.className).toContain('text-white');

    expect(allButton.className).not.toContain('bg-zinc-800');
    expect(allButton.className).toContain('text-zinc-400');
  });

  it('sets aria-current for the active category', () => {
    render(
      <CategoryFilter 
        activeCategory="scifi" 
        onCategoryChange={() => {}} 
      />
    );
    
    const scifiButton = screen.getByText('Sci-Fi');
    const allButton = screen.getByText('All');
    
    expect(scifiButton).toHaveAttribute('aria-current', 'page');
    expect(allButton).not.toHaveAttribute('aria-current', 'page');
  });
}); 