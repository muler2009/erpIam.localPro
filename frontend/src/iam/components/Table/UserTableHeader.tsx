import React, { useState } from 'react'
import { Headers, flexRender } from '@tanstack/react-table'
import {TableHeaderProps} from '../../models/user.model'
import * as HiIcons  from "react-icons/hi";
import * as MiIcons from "react-icons/md";
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import * as LuIcons from "react-icons/lu";


const UserTableHeader = ({headerColElement, index}: TableHeaderProps) => {

  const [open, setOpen] = useState(false)
  const isSorted = headerColElement.column.getIsSorted()

  const handleMenuClick = () => {
    setOpen(prev => !prev);
  };

  return (
    <th 
      id={headerColElement.id}
      className='relative'
      >
        {" "}
        <div className='flex '>
          
            {
                headerColElement.isPlaceholder 
                ? null 
                : flexRender(
                    headerColElement.column.columnDef.header,
                    headerColElement.getContext()
                )
            }
            {
              isSorted 
              &&
              <div className='px-2'>
                {isSorted === "desc" && <LuIcons.LuArrowUpWideNarrow /> }
                {isSorted === "asc" && <LuIcons.LuArrowDownWideNarrow />}
              </div>
            }
          

          <div className=''>
            <div className='menu pl-2' onClick={handleMenuClick}>
              <MiIcons.MdOutlineKeyboardArrowDown />
                <div className='relative w-[10%] top-1'>
                  {
                    open && (
                      <div className='absolute bg-white w-[150px] z-10 border py-2 px-3 rounded-[5px] hover:bg-sky-50 -left-0'>
                        <h1 onClick={headerColElement.column.getToggleSortingHandler()}>
                          {isSorted === "desc" ? "Asc" : "Desc" }
                        </h1>
                      </div>
                    )
                  }

                </div>
            </div>
          </div>
        </div>
    </th>
  )
}

export default UserTableHeader