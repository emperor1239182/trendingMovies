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

export const Moviecard = ({movies}: MoviecardProps)=>{
    return(
        <>
            <div>
        <ul>
          {movies.map((movie) =>(
            <div key={movie.id}>
            <p >{movie.title}</p>
            <img
             src={movie.poster_path ? 
                `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'no movie'}
                />
                <p>{movie.overview} </p>
            </div>
          ))}
        </ul>
    </div>
        </>
    )
}