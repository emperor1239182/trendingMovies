import './App.css';
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { FaBars } from 'react-icons/fa';
import { Search } from './search';
import { Button } from './button'; 
import { Moviecard } from './moviecard';


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



  const apiKey = import.meta.env.VITE_MOVIES_API_KEY
  const apiBaseUrl = 'https://api.themoviedb.org/3';

  //prevent too many requests from the api
  useDebounce(()=> setDebouncedSearch(search), 1000, [search]);

  const topics: string[] = ['Trending', 'TVShows', 'People']

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
    endPoint = `${apiBaseUrl}/search/movie?query=${encodeURIComponent(debouncedSearch)}&language=en-US&page=${page}&include_adult=false`;
  } else if (topicQuery === 'Trending') {
    endPoint = `${apiBaseUrl}/trending/movie/day?language=en-US&page=${page}&sort_by=created_at.asc`;
  } else if (topicQuery === 'TVShows') {
    endPoint = `${apiBaseUrl}/discover/tv?/&language=en-US&page=${page}&sort_by=popularity.desc`;
  } else if (topicQuery === 'People') {
    endPoint = `${apiBaseUrl}/person/popular?language=en-US&page=${page}`;
  }  else {
    endPoint = `${apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
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
  
  return (
    <>
      <div>

        <section className='topBar'>
          <h1 className='tag text-[1.2rem] md:text-3xl'>Movie Drum <span className='logo'></span></h1>
          <FaBars onClick={() => setIsModal((prev) => !prev)} className='block md:hidden h-7 absolute right-0'/>
          <nav className= {isModal? 'block' : 'hidden md:flex justify-center items-center gap-8' }>
          {topics.map((topic, id)=>(
            <ul className='navBar'>
          <li key={id} onClick={()=> setTopicQuery(topic)}>{topic}</li>
        </ul>
          ))}
      </nav>
        </section>

        <header className='header'>
          <img src='/banner2.png' alt='banner' className="w-full h-[60vh]" />
        <h1 className='intro'>Discover New <span className='tag'>Movies</span> You Love Without The Hassle</h1>
        <Search search={search} setSearch={setSearch}/>
  </header>

  <div>
    {isLoading? (<p>Loading....</p>) : 
    errorMessage? ( <p> {errorMessage}</p>) :
    <Moviecard movies={movies} topicQuery={topicQuery}/>
    }
    
    <Button page={page} setPage={setPage} totalPages={totalPages}/>
  </div>

     </div>
     </>
  )
}

export default App
