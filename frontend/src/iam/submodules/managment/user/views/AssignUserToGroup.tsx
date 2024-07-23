import React, { useState, useCallback } from 'react'
import { useGetGroupsQuery } from '../../../../features/groupsAPI'
import CreateGroups from '../../modals/CreateGroups'
import GroupTable from '../../../../components/Table/GroupTableUI'
// import { GROUP_COLUMN_WITH_SELECTION } from '../../constants/columns/groupColumn'

import * as AiIcons from 'react-icons/ai'
import { group } from 'console'
// import useUserContext from '../context/useUserContext'
import CustomTable, { SelectedRowContextProvider } from '../../../../components/Table/CustomTable'

interface Group {
  id: number;
  name: string;
}

interface UserProps {
  name: string;
  groups: Group[];
  other: string;
}

const AssignUserToGroup = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleIsOpenCloseMenu = useCallback(() => {setIsOpen(prevOpen => !prevOpen)}, [isOpen])
    const {data, isSuccess, isLoading} = useGetGroupsQuery()
    // const { newUserAccount } = useUserContext()

    

  return (
    <>
      <div className='flex flex-col justify-center gap-3 items-start bg-gray-100 bg-opacity-45 py-2 px-3'>
        <h1 className='text-[12px] text-[#333] text-opacity-70 pt-3'>Attach user to group</h1>
        <div className='flex space-x-5'>
            <button className='bg-green-600 btn-sm px-5 text-[13px] text-white bg-opacity-70 hover:bg-green-700' onClick={() => setIsOpen(prev => !prev)}>Create Group</button>
            <button className='bg-green-600 btn-sm px-5 text-[13px] text-white bg-opacity-70 hover:bg-green-700'>Refresh</button>
        </div>
      </div>

      <div className='pt-1'>
      {
        isSuccess ? (
            data?.length > 0 ? (
            <div>
              <SelectedRowContextProvider>
                <CustomTable />
              </SelectedRowContextProvider>
            </div>
            
            ) : (
                <div className='flex flex-col'>
                                                          
                
                    <p className='text-black text-center text-[18px] text-opacity-50'>No Group available.</p>                      
                </div>
            )
        ) : null
      }
      </div>
     
      
        {/* <button className='bg-green-500 text-white' onClick={handleClicke}>Click</button>  */}
      

      <CreateGroups isOpen={isOpen} handleIsOpenCloseMenu={handleIsOpenCloseMenu} title="New Group" />
    </>
  )
}

export default AssignUserToGroup






{/* <div className='w-[60%] pt-1'>
{
    isSuccess ? (
      data?.length > 0 ? (
        <div className='relative'>
            <select 
                multiple
                id='group_input' 
                className="block appearance-none w-full overflow-y-scroll border border-gray-300  bg-white bg-opacity-70 text-sm text-gray-700 py-2 rounded-[3px] leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
                name='group' 
                value={newUserAccount?.group}
                onChange={handleUserCreateInputChanges}
            >
                <option className='text-[13px] text-green-700 '></option>
                    {
                        data?.map((group, index) => (
                            <option 
                                key={index} value={group.custom_group_abbreviation} 
                                className={`py-2 px-4 hover:bg-gray-100 hover:text-[#333] font-Poppins focus:bg-black ${newUserAccount?.group?.includes(`${group.custom_group_abbreviation}`) ? 'bg-green-600 text-white': ""}`} 
                            >
                              {group.custom_group_abbreviation} | {group.custom_group_name}
                            </option> 
                        ))
                    }
            </select>   
            {/* <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
              <AiIcons.AiOutlineCaretDown  />
            </span> */}

        // </div>
        // ) : (
//             <select  className='select-md rounded-sm font-MonaSans py-2.5'>
//             <option>No Department Added</option>
//             </select>
//         )
//     ) : null
// }

// // {newUserAccount?.group}
// </div> */}



// {
//   isSuccess ? (
//       data?.length > 0 ? (
//       <div>
//           <GroupTable 
//               columns={GROUP_COLUMN_WITH_SELECTION}
//               data={data || []}                        
//           />
//       </div>
      
//       ) : (
//           <div className='flex flex-col'>
//               <GroupTable 
//               columns={GROUP_COLUMN_WITH_SELECTION}
//               data={data || []}                                          
//           />
//               <p className='text-black text-center text-[18px] text-opacity-50'>No Group available.</p>                      
//           </div>
//       )
//   ) : null
// }