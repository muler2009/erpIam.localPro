import React, { useState } from 'react'
import { Input } from '../reusable';
import { SearchProps } from '../interface/Search.Interface';

const Search = ({globalFilter, setGlobalFilter} : SearchProps) => {

  return (
    <div>
      <Input   
        id="serech_input" 
        type='text'
        name='search'
        className='input-md rounded-[2px] text-[13px]'
        placeholder='Search here'
        value={globalFilter}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(event.target.value)}
      />
    </div>
  )
}

export default Search
