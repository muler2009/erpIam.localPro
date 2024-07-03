import React from 'react'
import {ColumnFiltersState}  from '@tanstack/react-table'

interface FilterItemProps {
    filter: any;
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>

}

const FilteringItem = ({ filter, setColumnFilters }: FilterItemProps) => {

    // const hanleFilterClick = () => {
       
    // }


  return (
    <div 
       className='font-Poppins py-2 text-[13px] flex justify-start items-center space-x-3 px-3 hover:bg-[#f5f3f3] hover:text-black text-[#333] text-opacity-50'
       onClick={() => 
        setColumnFilters(
            (prev: any) => {
                const filteritems = prev.find((f: any) => f.id === 'filter') 
                if(!filteritems) {
                    return prev.concat({
                        id: 'filter',
                        value: [filter.id]
                    })
                }  
            }
        )
        }
    >
        {filter.label}
    </div>
  )
}

export default FilteringItem
