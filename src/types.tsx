export interface MovieDetails {
  id: number;
  title: string;// components/MovieModal.tsx
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  vote_average: number;
  original_language: string;
  tagline: string;
  status: string;
  homepage: string;
}