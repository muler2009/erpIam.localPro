import React from 'react'
import * as MdIcons from 'react-icons/md'
import * as IoIcons from 'react-icons/io'
import { Table } from '@tanstack/react-table'
import { UserAccountInterfacee } from '../../models/user.model'

interface TableInstanceProps {
    table: any
}

const PaginationController = ({ table }: {table: Table<UserAccountInterfacee>}) => {
  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <div className='flex space-x-3'>
          <div className='flex items-center gap-1'>
            <button 
              className={`px-2 ${table.getCanPreviousPage() === true && 'btn-sm rounded-none bg-green-600 text-white cursor-pointer'}`} 
              onClick={() => table.firstPage()}  disabled={!table.getCanPreviousPage()}>
                <MdIcons.MdKeyboardDoubleArrowLeft />
            </button>

            <button 
              className={`px-2 ${table.getCanPreviousPage() === true && 'btn-sm rounded-none bg-green-600 text-white cursor-pointer'}`} 
              onClick={() => table.previousPage()}  disabled={!table.getCanPreviousPage()}
            >
                <IoIcons.IoIosArrowBack />
            </button>
          </div>
          <div  className="flex items-center gap-1 text-[13px]">
            <p>Page</p>
              {table.getState().pagination.pageIndex + 1} of {' '}{table.getPageCount()}
          </div>
          </div>
          <div className='flex items-center gap-1'>
            <button className={`px-2 ${table.getCanNextPage() === true && 'btn-sm rounded-none bg-green-600 text-white cursor-pointer'}`} 
                onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <IoIcons.IoIosArrowForward />
            </button>

            <button className={`px-2 ${table.getCanNextPage() === true && 'btn-sm rounded-none bg-green-600 text-white cursor-pointer'}`} 
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}  disabled={!table.getCanNextPage()}>
                <MdIcons.MdKeyboardDoubleArrowRight />
            </button>
          </div>
      </div>
     
    </>
     
    
  )
}

export default PaginationController

{/* */}

       
        
      