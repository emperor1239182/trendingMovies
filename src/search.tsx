import { FaSearch } from 'react-icons/fa'
type SearchProps = {
    search: string;
    setSearch: (value: string) => void;
};

export const Search = ({search, setSearch}: SearchProps) => {
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