import { FaSearch } from 'react-icons/fa'
export const Search = ({search, setSearch})=>{
    return (
        <>
        <div className='search'>
                  <input type='text'
                  placeholder='search through 300+ movies onine'
                  value={search}
                  onChange={(event)=> setSearch(event.target.value)}
                  />
                  <FaSearch/>
                </div>
        </>
    )
}