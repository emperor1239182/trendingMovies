import { useState, useEffect } from 'react'
import './App.css'
import { Search } from './search';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  type options = {
    title: string
    date: number
    plot: string
    type: string
  }

  const parameters : options = {
    title: 'je',
    date: 45,
    plot: 'hello',
    type: 'werr'
  }

  const apiKey = import.meta.env.VITE_STREAMING_API_KEY;

  const getMovies = async()=>{
    const data = await fetch(url)
  }

  useEffect(()=>{

  })
  
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
      
  </div>

     </div>
     </>
  )
}

export default App
