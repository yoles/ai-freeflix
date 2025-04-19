export namespace MovieDomainModel {
  export type Movie = {
    id: number;
    title: string;
    originalTitle: string;
    overview: string;
    imageURL: string;
    logoURL?: string;
    releaseDate: string;
    isNewRelease?: boolean;
    subtitle?: string;
    voteAverage: number;
    adult: boolean;
    genres?: string[];
    duration?: string;
  }
}

// Type alias for easier usage
export type Movie = MovieDomainModel.Movie;

// Sample featured movie data - in a real application, this would come from an API
export const dummyMovie: Movie = {
  id: 1,
  title: 'VENOM: THE LAST DANCE',
  originalTitle: 'VENOM',
  overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia, odio et iaculis auctor, magna ipsum lacinia arcu, at finibus nulla dui sagittis diam.',
  imageURL: 'src/assets/venom.webp',
  releaseDate: '2024',
  voteAverage: 8.5,
  adult: false,
  genres: ['SCIENCE FICTION', 'ACTION', 'ADVENTURE'],
  isNewRelease: true,
  duration: '2h45',
};

// Sample movies data for each category
export const moviesData: Record<string, Movie[]> = {
  horror: [
    {
      id: 11,
      title: 'The Haunting',
      originalTitle: 'The Haunting',
      overview: 'A horror movie about a haunted house',
      imageURL: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      releaseDate: '2023',
      voteAverage: 7.5,
      adult: false,
      genres: ['Horror', 'Thriller'],
      duration: '1h47'
    },
    {
      id: 12,
      title: 'Nightmare Alley',
      originalTitle: 'Nightmare Alley',
      overview: 'A mysterious horror film',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2022',
      voteAverage: 8.2,
      adult: false,
      genres: ['Horror', 'Mystery'],
      duration: '2h30'
    },
    {
      id: 13,
      title: 'The Witch',
      originalTitle: 'The Witch',
      overview: 'A folk horror tale',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2021',
      voteAverage: 9.0,
      adult: false,
      genres: ['Horror', 'Folk'],
      duration: '1h32'
    },
    {
      id: 14,
      title: 'Hereditary',
      originalTitle: 'Hereditary',
      overview: 'A family faces supernatural terrors',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2020',
      voteAverage: 8.9,
      adult: true,
      genres: ['Horror', 'Drama'],
      duration: '2h07'
    },
    {
      id: 15,
      title: 'Midsommar',
      originalTitle: 'Midsommar',
      overview: 'A mysterious festival turns sinister',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2019',
      voteAverage: 8.3,
      adult: true,
      genres: ['Horror', 'Mystery'],
      duration: '2h27'
    }
  ],
  superhero: [
    {
      id: 21,
      title: 'The Batman',
      originalTitle: 'The Batman',
      overview: 'Batman fights crime in Gotham City',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2022',
      voteAverage: 8.5,
      adult: false,
      genres: ['Action', 'Superhero'],
      duration: '2h56'
    },
    {
      id: 22,
      title: 'Wonder Woman',
      originalTitle: 'Wonder Woman',
      overview: 'Diana Prince becomes Wonder Woman',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2020',
      voteAverage: 9.3,
      adult: false,
      genres: ['Action', 'Superhero'],
      duration: '2h21'
    },
    {
      id: 23,
      title: 'Black Panther',
      originalTitle: 'Black Panther',
      overview: 'T\'Challa returns to Wakanda',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2018',
      voteAverage: 9.6,
      adult: false,
      genres: ['Action', 'Superhero', 'Adventure'],
      duration: '2h14'
    },
    {
      id: 24,
      title: 'Aquaman',
      originalTitle: 'Aquaman',
      overview: 'Arthur Curry claims his destiny',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2018',
      voteAverage: 7.1,
      adult: false,
      genres: ['Action', 'Superhero', 'Adventure', 'Fantasy'],
      duration: '2h23'
    },
    {
      id: 25,
      title: 'Shazam!',
      originalTitle: 'Shazam!',
      overview: 'A boy transforms into a superhero',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2019',
      voteAverage: 9.0,
      adult: false,
      genres: ['Action', 'Superhero', 'Comedy', 'Fantasy'],
      duration: '2h12'
    }
  ],
  trending: [
    {
      id: 31,
      title: 'Dune',
      originalTitle: 'Dune',
      overview: 'A noble family becomes embroiled in a war for control of the galaxy',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2021',
      voteAverage: 9.1,
      adult: false,
      genres: ['Science Fiction', 'Adventure', 'Drama'],
      duration: '2h35'
    },
    {
      id: 32,
      title: 'No Time to Die',
      originalTitle: 'No Time to Die',
      overview: 'James Bond has left active service',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2021',
      voteAverage: 8.3,
      adult: false,
      genres: ['Action', 'Adventure', 'Thriller', 'Spy'],
      duration: '2h43'
    },
    {
      id: 33,
      title: 'Top Gun: Maverick',
      originalTitle: 'Top Gun: Maverick',
      overview: 'Maverick returns to train a new generation',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2022',
      voteAverage: 9.6,
      adult: false,
      genres: ['Action', 'Drama', 'Adventure'],
      duration: '2h10'
    },
    {
      id: 34,
      title: 'Avatar: The Way of Water',
      originalTitle: 'Avatar: The Way of Water',
      overview: 'Return to Pandora',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2022',
      voteAverage: 9.2,
      adult: false,
      genres: ['Science Fiction', 'Adventure', 'Action', 'Fantasy'],
      duration: '3h12'
    },
    {
      id: 35,
      title: 'The Matrix Resurrections',
      originalTitle: 'The Matrix Resurrections',
      overview: 'Neo returns to the Matrix',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2021',
      voteAverage: 6.3,
      adult: false,
      genres: ['Science Fiction', 'Action', 'Adventure'],
      duration: '2h28'
    }
  ],
  scifi: [
    {
      id: 41,
      title: 'Blade Runner 2049',
      originalTitle: 'Blade Runner 2049',
      overview: 'A new blade runner unearths a secret',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2017',
      voteAverage: 8.8,
      adult: false,
      genres: ['Sci-Fi', 'Drama'],
      duration: '2h44'
    },
    {
      id: 42,
      title: 'Arrival',
      originalTitle: 'Arrival',
      overview: 'A linguist works with the military to communicate with alien lifeforms',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2016',
      voteAverage: 9.4,
      adult: false,
      genres: ['Sci-Fi', 'Drama'],
      duration: '1h56'
    },
    {
      id: 43,
      title: 'Interstellar',
      originalTitle: 'Interstellar',
      overview: 'A team of explorers travel through a wormhole in space',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2014',
      voteAverage: 8.8,
      adult: false,
      genres: ['Sci-Fi', 'Adventure'],
      duration: '2h49'
    },
    {
      id: 44,
      title: 'Ex Machina',
      originalTitle: 'Ex Machina',
      overview: 'A programmer participates in an experiment with AI',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '2014',
      voteAverage: 9.2,
      adult: false,
      genres: ['Sci-Fi', 'Mystery'],
      duration: '1h48'
    },
    {
      id: 45,
      title: '2001: A Space Odyssey',
      originalTitle: '2001: A Space Odyssey',
      overview: 'Humanity finds a mysterious artifact on the Moon',
      imageURL: 'https://placehold.co/500x750',
      releaseDate: '1968',
      voteAverage: 9.3,
      adult: false,
      genres: ['Sci-Fi', 'Adventure'],
      duration: '2h29'
    }
  ]
}; 