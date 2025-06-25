import type { MovieDetails } from './types'; 

type MovieModalProps = {
  movie: MovieDetails | null;
  onClose: () => void;
};

export const MovieModal  = ({ movie, onClose } : MovieModalProps) => {
  if (!movie) return null;

  return (
    <div className='fixed inset-0 w-full bg-transparent bg-opacity-60 flex justify-center items-center z-50 px-4'>
      <div className="flex flex-col overflow-auto relative bg-white rounded-lg shadow-lg w-[90%] max-w-2xl h-100 p-6 hide-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black w-10 md:w-[100px] text-l"
        >
          &times;
        </button>
        <h2 className="text-[15px] md:text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="text-sm text-gray-600 italic mb-4">{movie.tagline}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full max-h-[60vh] object-fit rounded mb-4"
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