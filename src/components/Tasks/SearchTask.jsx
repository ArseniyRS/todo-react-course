import React, { useState } from 'react'



const SearchTask = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('')
    return (
        <div className={'search-task'}>
            <input placeholder="search tasks..." type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <button onClick={() => onSearch(searchValue)}><i class="fas fa-search" /></button>
        </div>
    )
}

export default SearchTask