import { GoldenStar } from "./star";
 
 type Movie = {
  id : number;
  title : string;
  poster_path : string;
  overview : string;
  vote_average : number;
  original_language : string;
  release_date : string;
};

type MoviecardProps = {
  movies: Movie[];
};

export const Moviecard = ({ movies }: MoviecardProps) => {

  return (
    <div className="movie-list">
      <h2 className='text-[#ffffffa7] font-extrabold text-4xl '>Movie Lists</h2>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <div>
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
            <div className="details">

              <div className="rating">
            <p>{movie.vote_average? movie.vote_average.toFixed(1) : 'N/A'}</p>
            <GoldenStar/>
            </div>

            <span>.</span>
            <p className="language">{movie.original_language}</p>

            <span>.</span>
            <p className="year">{movie.release_date? movie.release_date.split('-')[0] : 'N/A' }</p>
            </div>

            <p>{movie.overview}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};