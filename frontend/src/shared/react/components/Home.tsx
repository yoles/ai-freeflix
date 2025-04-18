import React, { useState, useMemo } from 'react';
import HeroSection from './HeroSection';
import CategoryFilter, { CategoryType } from './CategoryFilter';
import CategorySection, { Movie } from './CategorySection';

// Sample featured movie data - in a real application, this would come from an API
const featuredMovie = {
  id: '1',
  title: 'VENOM',
  subtitle: 'THE LAST DANCE',
  backdropUrl: '/src/assets/venom.webp', // Using the local image in the src directory
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia, odio et iaculis auctor, magna ipsum lacinia arcu, at finibus nulla dui sagittis diam.',
  duration: '1H 45M',
  genres: ['SCIENCE FICTION', 'ACTION', 'ADVENTURE'],
  isNewRelease: true,
};

// Sample movies data for each category
const moviesData: Record<string, Movie[]> = {
  horror: [
    {
      id: 'h1',
      title: 'The Haunting',
      thumbnailUrl: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      year: 2023,
      duration: '1h 45m',
      rating: '75%',
      genres: ['Horror', 'Thriller']
    },
    {
      id: 'h2',
      title: 'Nightmare Alley',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2022,
      duration: '2h 10m',
      rating: '82%',
      genres: ['Horror', 'Mystery']
    },
    {
      id: 'h3',
      title: 'The Witch',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2021,
      duration: '1h 55m',
      rating: '90%',
      genres: ['Horror', 'Folk']
    },
    {
      id: 'h4',
      title: 'Hereditary',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2020,
      duration: '2h 7m',
      rating: '89%',
      genres: ['Horror', 'Drama']
    },
    {
      id: 'h5',
      title: 'Midsommar',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2019,
      duration: '2h 18m',
      rating: '83%',
      genres: ['Horror', 'Mystery']
    }
  ],
  superhero: [
    {
      id: 's1',
      title: 'The Batman',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2022,
      duration: '2h 56m',
      rating: '85%',
      genres: ['Action', 'Superhero']
    },
    {
      id: 's2',
      title: 'Wonder Woman',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2020,
      duration: '2h 31m',
      rating: '93%',
      genres: ['Action', 'Superhero']
    },
    {
      id: 's3',
      title: 'Black Panther',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2018,
      duration: '2h 14m',
      rating: '96%',
      genres: ['Action', 'Superhero']
    },
    {
      id: 's4',
      title: 'Aquaman',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2018,
      duration: '2h 23m',
      rating: '71%',
      genres: ['Action', 'Superhero']
    },
    {
      id: 's5',
      title: 'Shazam!',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2019,
      duration: '2h 12m',
      rating: '90%',
      genres: ['Comedy', 'Superhero']
    }
  ],
  trending: [
    {
      id: 't1',
      title: 'Dune',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2021,
      duration: '2h 35m',
      rating: '91%',
      genres: ['Sci-Fi', 'Adventure']
    },
    {
      id: 't2',
      title: 'No Time to Die',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2021,
      duration: '2h 43m',
      rating: '83%',
      genres: ['Action', 'Thriller']
    },
    {
      id: 't3',
      title: 'Top Gun: Maverick',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2022,
      duration: '2h 10m',
      rating: '96%',
      genres: ['Action', 'Drama']
    },
    {
      id: 't4',
      title: 'Avatar: The Way of Water',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2022,
      duration: '3h 12m',
      rating: '92%',
      genres: ['Sci-Fi', 'Adventure']
    },
    {
      id: 't5',
      title: 'The Matrix Resurrections',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2021,
      duration: '2h 28m',
      rating: '63%',
      genres: ['Sci-Fi', 'Action']
    }
  ],
  scifi: [
    {
      id: 'sf1',
      title: 'Blade Runner 2049',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2017,
      duration: '2h 44m',
      rating: '88%',
      genres: ['Sci-Fi', 'Drama']
    },
    {
      id: 'sf2',
      title: 'Arrival',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2016,
      duration: '1h 56m',
      rating: '94%',
      genres: ['Sci-Fi', 'Drama']
    },
    {
      id: 'sf3',
      title: 'Interstellar',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2014,
      duration: '2h 49m',
      rating: '88%',
      genres: ['Sci-Fi', 'Adventure']
    },
    {
      id: 'sf4',
      title: 'Ex Machina',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 2014,
      duration: '1h 48m',
      rating: '92%',
      genres: ['Sci-Fi', 'Drama']
    },
    {
      id: 'sf5',
      title: '2001: A Space Odyssey',
      thumbnailUrl: 'https://placehold.co/500x750',
      year: 1968,
      duration: '2h 29m',
      rating: '93%',
      genres: ['Sci-Fi', 'Mystery']
    }
  ]
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const handleWatch = () => {
    console.log('Watch now clicked');
    // Implement watch functionality
  };

  const handleTrailer = () => {
    console.log('Trailer clicked');
    // Implement trailer functionality
  };

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  const handleViewAll = (category: string) => {
    console.log(`View all ${category} clicked`);
    // Implement view all functionality
  };

  const handleMovieClick = (movieId: string) => {
    console.log(`Movie clicked: ${movieId}`);
    // Implement movie click functionality
  };

  // Create expanded movie lists for category view (4 rows of 5 items)
  const expandedMovieList = useMemo(() => {
    const result: Record<string, Movie[]> = {};
    
    // For each category, generate a list of 20 movies (or duplicate existing ones)
    Object.keys(moviesData).forEach(category => {
      if (category === 'trending') return; // Skip trending as it's handled separately
      
      const baseMovies = moviesData[category];
      // Create a list of 20 movies by repeating the existing ones if needed
      result[category] = Array(20).fill(null).map((_, index) => {
        const originalIndex = index % baseMovies.length;
        return {
          ...baseMovies[originalIndex],
          id: `${baseMovies[originalIndex].id}-${Math.floor(index / baseMovies.length)}` // Create unique IDs
        };
      });
    });
    
    return result;
  }, []);

  // Filter categories based on active filter
  const shouldShowCategory = (category: string): boolean => {
    if (activeCategory === 'all') return true;
    return category === activeCategory;
  };

  return (
    <div className="flex flex-col">
      <HeroSection 
        movie={featuredMovie}
        onWatch={handleWatch}
        onTrailer={handleTrailer}
      />
      
      <div className="container px-4 py-12 md:px-6 mx-auto">
        <div className="space-y-8">
          {/* Category Filter */}
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {activeCategory === 'all' ? (
            // Show regular categories layout for 'all'
            <>
              {shouldShowCategory('horror') && (
                <CategorySection
                  title="Horror"
                  movies={moviesData.horror}
                  onViewAll={() => handleViewAll('horror')}
                  onMovieClick={handleMovieClick}
                />
              )}

              {shouldShowCategory('superhero') && (
                <CategorySection
                  title="Superhero"
                  movies={moviesData.superhero}
                  onViewAll={() => handleViewAll('superhero')}
                  onMovieClick={handleMovieClick}
                />
              )}

              {/* Trending Now is always shown in 'all' view */}
              <CategorySection
                title="Trending Now"
                movies={moviesData.trending}
                onViewAll={() => handleViewAll('trending')}
                onMovieClick={handleMovieClick}
              />

              {shouldShowCategory('scifi') && (
                <CategorySection
                  title="Sci-Fi"
                  movies={moviesData.scifi}
                  onViewAll={() => handleViewAll('scifi')}
                  onMovieClick={handleMovieClick}
                />
              )}
            </>
          ) : (
            // Show expanded view for specific category (4 rows of 5 items)
            <CategorySection
              title={activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              movies={expandedMovieList[activeCategory] || []}
              onViewAll={() => handleViewAll(activeCategory)}
              onMovieClick={handleMovieClick}
            />
          )}
        </div>
      </div>
    </div>
  );
} 