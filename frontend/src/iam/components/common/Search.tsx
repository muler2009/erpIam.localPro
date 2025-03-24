import React, { useState } from 'react'
import { Input } from '../reusable';
import { SearchProps } from '../interface/Search.Interface';

const Search = ({globalFilter, setGlobalFilter} : SearchProps) => {

  return (
      <Input   
        id="serech_input" 
        type='text'
        name='search'
        className='px-5 py-[8px] text-[12px] rounded-full font-normal text-gray-700 bg-white border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:outline-none focus:bg-white ' 
        placeholder='Search here'
        value={globalFilter}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(event.target.value)}
      />
    
  )
}

export default Search


