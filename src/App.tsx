import './App.css';
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { FaBars,  FaTimes} from 'react-icons/fa';
import { Search } from './search';
import { Button } from './button'; 
import { Moviecard } from './moviecard';
import type { MovieDetails } from './types'; 
import { MovieModal } from './movieDetails';
import { Footer } from './footer';



function App() {

  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isModal, setIsModal] = useState(false);
  const [topicQuery, setTopicQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [showModal, setShowModal] = useState(false);



  const apiKey = import.meta.env.VITE_MOVIES_API_KEY
  const apiBaseUrl = 'https://api.themoviedb.org/3';

  const queries : string[] = [
    `${apiBaseUrl}/search/movie?query=${encodeURIComponent(debouncedSearch)}&language=en-US&page=${page}&include_adult=false`,
    `${apiBaseUrl}/trending/movie/day?language=en-US&page=${page}&sort_by=created_at.asc`,
    `${apiBaseUrl}/discover/tv?/&language=en-US&page=${page}&sort_by=popularity.desc`,
    `${apiBaseUrl}/person/popular?language=en-US&page=${page}`,
    `${apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
  ];

  //prevent too many requests from the api
  useDebounce(()=> setDebouncedSearch(search), 1000, [search]);

  const topics: string[] = ['Movies', 'Trending', 'TVShows', 'People']

  type param = {
    method: string;
    headers: HeadersInit;
  }

  const options : param = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
};


 const getMovies = async (debouncedSearch : string, topicQuery : string) => {
  setIsLoading(true);
  setErrorMessage(''); 

  try {
      let endPoint = '';

  if (debouncedSearch) {
    endPoint = queries[0];
  }  else if (topicQuery === 'Movies'){
    endPoint =  queries[4];
  }else if (topicQuery === 'Trending') {
    endPoint = queries[1];
  } else if (topicQuery === 'TVShows') {
    endPoint = queries[2];
  } else if (topicQuery === 'People') {
    endPoint = queries[3];
  } else {
    endPoint = queries[4];
  }


    const response = await fetch(endPoint, options);

    if (!response.ok) {
      throw new Error('Failed to load movies');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      setErrorMessage('No movies found');
      setMovies([]);
    } else {
      setMovies(data.results);
      setTotalPages(data.total_pages);
      console.log(data)
    }
  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    setErrorMessage('Error fetching movies. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    getMovies(debouncedSearch, topicQuery);
}, [debouncedSearch, page, topicQuery]);


const getMovieDetails = async (movieId: number): Promise<void> => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const endpoint = `${apiBaseUrl}/movie/${movieId}?language=en-US`;
    const response = await fetch(endpoint, options);

    if (!response.ok) throw new Error('Failed to fetch movie details');

    const data: MovieDetails = await response.json();
    setSelectedMovie(data);
    setShowModal(true);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    setErrorMessage('Could not load movie details.');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <>
      <div>

        <section className='topBar'>
          <h1 className='tag text-[1.2rem] md:text-3xl'>Movie Drum <span className='logo'></span></h1>
          <FaBars onClick={() => setIsModal((prev) => !prev)} className='block md:hidden h-7 absolute right-2 text-[#080e11]'/>

          <nav className= {isModal? 'block sideBar' : 'modal' }>
            {isModal? 
            < FaTimes className='absolute right-0' onClick={() => setIsModal((prev) => !prev)} size={23}/>
            : ''
            }
          {topics.map((topic, id)=>(
            <>
            <ul >
          <li key={id} onClick={() => { setTopicQuery(topic); setIsModal(false) }} className='text-black md:text-white text-center mt-5 md:mt-0 cursor-pointer'>{topic}</li>
        </ul>
        </>
          ))}
      </nav>

        </section>

        <header className='header'>
          <img src='/banner2.png' alt='banner' className="w-full h-[60vh]" />
        <h1 className='intro'>Discover New <span className='tag'>Movies</span> You Love Without The Hassle</h1>
        <Search search={search} setSearch={setSearch} setTopicQuery={setTopicQuery}/>
  </header>

  <div>
{isLoading ? (
  <p>Loading...</p>
) : errorMessage ? (
  <p>{errorMessage}</p>
) : (
  <Moviecard 
    movies={movies} 
    topicQuery={topicQuery}  
    onMovieClick={(id: number) => {
      if (topicQuery !== 'People') {
        getMovieDetails(id);
      }
    }}
  />
)}
    <Button page={page} setPage={setPage} totalPages={totalPages}/>
  </div>

  {showModal && selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={() => setShowModal(false)} />
)}
     </div>

     <Footer/>
     </>
  )
}


export default App