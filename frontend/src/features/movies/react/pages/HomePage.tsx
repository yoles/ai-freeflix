import HeroSection from '../sections/HeroSection';
import CategoryFilter from '../sections/CategoryFilter';
import CategorySection from '../sections/CategorySection';
import { useHomePresenter } from '../hooks/useHomePresenter';

export default function Home() {
  const { 
    dummyMovie, 
    activeCategory, 
    moviesData, 
    expandedMovieList, 
    shouldShowCategory, 
    handleWatchMovie, 
    handlePlayTrailer, 
    handleCategoryChange, 
    handleViewAllCategory, 
    handleSelectMovie,
    isLoading
  } = useHomePresenter();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading movies...</div>
      </div>
    );
  }

  // Handle case where no movies are available
  if (!dummyMovie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">No movies available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <HeroSection 
        movie={dummyMovie}
        onWatch={() => handleWatchMovie(dummyMovie.id)}
        onTrailer={() => handlePlayTrailer(dummyMovie.id)}
      />
      
      <div className="container px-4 py-12 md:px-6 mx-auto">
        <div className="space-y-8">
          {/* Category Filter */}
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {activeCategory === 'all' ? (
            <>
              {/* Trending Now is always shown in 'all' view */}
              <CategorySection
                title="Trending Now"
                movies={moviesData.trending}
                onViewAll={() => handleViewAllCategory('trending')}
                onMovieClick={handleSelectMovie}
              />
              {shouldShowCategory('horror') && (
                <CategorySection
                  title="Horror"
                  movies={moviesData.horror}
                  onViewAll={() => handleViewAllCategory('horror')}
                  onMovieClick={handleSelectMovie}
                />
              )}

              {shouldShowCategory('superhero') && (
                <CategorySection
                  title="Superhero"
                  movies={moviesData.superhero}
                  onViewAll={() => handleViewAllCategory('superhero')}
                  onMovieClick={handleSelectMovie}
                />
              )}

              {shouldShowCategory('scifi') && (
                <CategorySection
                  title="Sci-Fi"
                  movies={moviesData.scifi}
                  onViewAll={() => handleViewAllCategory('scifi')}
                  onMovieClick={handleSelectMovie}
                />
              )}
            </>
          ) : (
            // Show expanded view for specific category (4 rows of 5 items)
            <CategorySection
              title={activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              movies={expandedMovieList[activeCategory] || []}
              onViewAll={() => handleViewAllCategory(activeCategory)}
              onMovieClick={handleSelectMovie}
            />
          )}
        </div>
      </div>
    </div>
  );
} 