// components/MovieModal.tsx
import React from 'react';
import type { MovieDetails } from './types'; // assuming you defined this interface

type MovieModalProps = {
  movie: MovieDetails | null;
  onClose: () => void;
};

export const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="text-sm text-gray-600 italic mb-4">{movie.tagline}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full max-h-96 object-cover rounded mb-4"
        />
        <p className="text-gray-800">{movie.overview}</p>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} mins</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};