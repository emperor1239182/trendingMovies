import { GoldenStar } from "./star";
 

type Movie = { 
  id : number;
   title : string;
    name : string;
     poster_path : string;
     profile_path : string;
      overview : string;
       vote_average : number;
        original_language : string;
         release_date : string; 
        };


type MoviecardProps = {
  movies: Movie[];
  topicQuery: string;
   onMovieClick: (id: number) => void;

};

export const Moviecard = ({ movies, topicQuery, onMovieClick}: MoviecardProps) => {

  return (
    <div className="movie-container">
      <h2 className='text-[#ffffffa7] font-extrabold text-4xl my-[-60px] self-start'>{topicQuery ? topicQuery : 'Movies'}</h2>

      <div >
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item mt-20"  onClick={() => onMovieClick(movie.id)}>
            <div className="movie-card hide-scrollbar">
            <img
             src={
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      : movie.profile_path

        ? `https://image.tmdb.org/t/p/w500/${movie.profile_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'
  }
              alt={movie.title}
              className="movie-poster h-50"
            />
            {movie.name ? movie.name 
            : 
            <div className="details flex gap-1">

              <div className="rating flex">
                <GoldenStar/>
            <p className="text-[12px]">{movie.vote_average? movie.vote_average.toFixed(1) : 'N/A'}</p>
            </div>

            <span className="text-[12px]">.</span>
            <p className="language text-[12px]">{movie.original_language}</p>
            <span className="text-[12px]">.</span>
            <p className="year text-[12px]">{movie.release_date? movie.release_date.split('-')[0] : 'N/A' }</p>

            </div>
}

            <h3 className="text-[#5db4fb] text-[12px] font-bold">{movie.title ? movie.title : movie.name}</h3>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};