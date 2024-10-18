import React, { useState } from 'react'
import { Input } from '../reusable';
import { SearchProps } from '../interface/Search.Interface';

const Search = ({globalFilter, setGlobalFilter} : SearchProps) => {

  return (
      <Input   
        id="serech_input" 
        type='text'
        name='search'
        className='px-2 py-[7px] text-[13px] font-Poppins font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:outline-none'      
        placeholder='Search here'
        value={globalFilter}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(event.target.value)}
      />
    
  )
}

export default Search
