import React, { useState } from 'react'
import * as LiaIcons from "react-icons/lia";
import * as Vsc from 'react-icons/vsc'
import { filterby } from '../../constants/filter';
import { FilterPropDef } from '../interface/Search.Interface';
import FilteringItem from './FilteringItem';

const FilterBy = ({columnFilters, setColumnFilters}: FilterPropDef) => {
    const [drop, setDrops] = useState<boolean>(false)
  
  return (
    <div className='bg-gray-100 flex items-center py-2 px-5 rounded-[3px] cursor-pointer relative' onClick={() => setDrops(prevState => !prevState)}>
        Filter <span className='ml-2'><LiaIcons.LiaFilterSolid size={18} /></span>
        {
            drop && (
                <div className='flex flex-col gap-3 absolute top-10 w-[200px] border border-gray-100 bg-white mr-4 -right-4 shadow-sm'>
                    <h5 className='pl-3 pt-4'>Filter By</h5>
                        <div className='border-t'>
                            {
                                filterby?.map((filter, index) => {
                                    return(
                                       <FilteringItem filter={filter} key={index} setColumnFilters={setColumnFilters} />
                                    )
                                })
                            }

                        </div>
                </div>
            )
        }

    </div>
  )
}

export default FilterBy

