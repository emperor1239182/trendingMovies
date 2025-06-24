import { FaSearch } from 'react-icons/fa'
type SearchProps = {
    search: string;
    setSearch: (value: string) => void;
    setTopicQuery: (value: string) => void;
};

export const Search = ({search, setSearch, setTopicQuery}: SearchProps) => {
    return (
        <>
        <div className='search'>
                  <input type='text'
                  placeholder='search through 300+ movies online'
                  value={search}
                  onChange={(event)=> {
                    console.log("Input changed to:", event.target.value);
                    setSearch(event.target.value);
                    setTopicQuery('')
                }}
                  />
                  <FaSearch/>
                </div>
        </>
    )
}