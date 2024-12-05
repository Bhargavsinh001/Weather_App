import React, { useState } from 'react'

const SearchBar = ({ setCity }) => {
    const [input, setInput] = useState("")
    const handleSearch = (e) => {
        e.preventDefault();
        if (input.trim() !== "") {
            setCity(input);
            setInput("")
        }
    }
    return (
        <>
            <form onSubmit={handleSearch} className='search-bar'>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Enter City' />
                <button type="submit">Search</button>
            </form>
        </>
    )
}

export default SearchBar