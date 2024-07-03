import React from 'react'
import * as AiIcons from 'react-icons/ai'
interface TableInstanceProps {
    table: any
}

const ShowEntries = ({ table } : TableInstanceProps) => {
  return (
        
        <div className={`flex justify-start items-center space-x-1 border border-gray-100 cursor-pointer`}>
            <h5 className='py-2 pl-2 text-[13px]'>Show</h5>
            <div className='relative pl-3'>
                <select
                    className="input-md py-[8px] border-none border-l font-Poppins text-xs rounded-none bg-white"
                    value={table.getState().pagination.pageSize}
                    onChange={e => {table.setPageSize(Number(e.target.value))}} 
                >
                    {[2, 5, 10, 20].map(pageSize => (
                        <option key={pageSize} value={pageSize} className='pr-2'>
                            {pageSize}
                        </option>
                    ))}
                </select>
                <span className='flex justify-center items-center absolute top-0 right-0 text-gray-500 bg-gray-50 h-full w-[20px] pointer-events-none cursor-pointer'>
                    <AiIcons.AiOutlineCaretDown  />
                </span>
                

            </div>

        </div>
   
  )
}

export default ShowEntries
