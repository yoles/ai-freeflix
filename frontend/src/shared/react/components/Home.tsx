import HeroSection from './HeroSection';

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

export default function Home() {
  const handleWatch = () => {
    console.log('Watch now clicked');
    // Implement watch functionality
  };

  const handleTrailer = () => {
    console.log('Trailer clicked');
    // Implement trailer functionality
  };

  return (
    <div className="flex flex-col">
      <HeroSection 
        movie={featuredMovie}
        onWatch={handleWatch}
        onTrailer={handleTrailer}
      />
      
      {/* The rest of the home page content will be implemented in subsequent tasks */}
      <div className="container px-4 py-12 md:px-6">
        {/* Placeholder for category filters and movie carousels */}
        <div className="text-center text-zinc-400">
          More content coming soon...
        </div>
      </div>
    </div>
  );
} 