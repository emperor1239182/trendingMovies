import { useState, useEffect } from 'react'
import './App.css'
import { Search } from './search';
import { Button } from './button'; 
import { Moviecard } from './moviecard';

function App() {

  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Number);
  const [isLoading, setIsLoading] = useState(false);


   const apiKey = import.meta.env.VITE_MOVIES_API_KEY
   const apiBaseUrl = 'https://api.themoviedb.org/3';

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

  const getMovies = async () => {
    setIsLoading((prev)=> !prev);

    try{
      const endPoint = `${apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`

      const response = await fetch(endPoint, options);

      if(!response){
        throw new Error('failed to load movies')
      }

      const data = await response.json();

      if(data.response == 'false'){
        setErrorMessage(data.Error || 'failed to fetch movies')
        setMovies([]);
      }

      console.log(data);
      setMovies(data.results);
      setTotalPages(data.total_pages);


    } catch (error){
      console.log(`error fetching movies: ${error}`);
      setErrorMessage('error fetching movies. Please try agian');
    } finally{
      setIsLoading(false);
    }
  }


  useEffect(()=>{
    getMovies();
  }, [page])
  
  return (
    <>
      <div>

        <header className='header'>
          <img src='/public/banner2.png' alt='banner' className='w-[500px] h-auto object-cover rounded border-none' />
        <h1>Discover New <span>Movies</span> You Love Without The Hassle</h1>

        <Search search={search} setSearch={setSearch}/>
  </header>

  <div>
    <h2>Movie Lists</h2>
    {isLoading? (<p>Loading....</p>) : 
    errorMessage? ( <p> {errorMessage}</p>) :
    <Moviecard movies={movies} />
    }
    
    <Button page={page} setPage={setPage} totalPages={totalPages}/>
  </div>

     </div>
     </>
  )
}

export default App
