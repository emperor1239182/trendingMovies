 type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  // add other fields as needed
};

type MoviecardProps = {
  movies: Movie[];
};


export const Moviecard = ({ movies }: MoviecardProps) => {
  return (
    <div className="movie-list">
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <h3>{movie.title}</h3>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Image'
              }
              alt={movie.title}
              className="movie-poster"
            />
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};