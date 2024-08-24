import React from 'react'
import { FlexOuterContainer, FlexBox, Text, P } from '../../../../iam/components/reusable/StyledComponent'
import GridView from '../modals/FolderGridView'
import { useGetFolderQuery } from '../../../services/folderAPISlice'
import { FolderDataInterface } from '../../../models/folder-models'
import FolderL from './FolderL'
import { FlexBoxInner } from '../../../../components/common/StyledComponent'
import { AiFillFolder } from 'react-icons/ai'
import UserTabNavigation from '../../../../iam/submodules/managment/user/views/user-mini-components/UserTabNavigation'
import FolderTabNavigation from './folder-mini-reusable-components/FolderTabNavigation'
import useUtils from '../../../hooks/useUtils'

interface FolderInteraceSample {
    folder_data: FolderDataInterface[]
}

const MainFolderLibrary = () => {

    const { data: folder_data } = useGetFolderQuery() 
    const {wrapText} = useUtils()
  return (
    <FlexOuterContainer className='mt-[1px] h-full gap-2'> 
        <FlexBox className='h-full'>
            <FlexBoxInner className='flex flex-col bg-white h-full pt-5 '> 
                <FlexBox className='pt-3 flex justify-between items-center'>
                    <FlexBoxInner className='mx-5'>
                        <Text className='font-semibold text-primary-green text-opacity-95 text-[23px]'>Main Library</Text>
                        <P className='text-[9px] text-[#333] text-opacity-65'>Document and any attachment the you made with yoou user account </P>
                    </FlexBoxInner>
                    <FlexBoxInner className='flex-grow pl-10 items-center pr-10 '>
                        <input className='input-md bg-gray-100 text-sm mb-4' placeholder='search file and folder'/>
                    </FlexBoxInner>
                </FlexBox>

                <FolderTabNavigation />
            </FlexBoxInner>

            {/* <FlexBoxInner className='w-[25%]  bg-white flex justify-start flex-wrap text-[10px]'>
               Folder Metta data placeholder
            </FlexBoxInner> */}
        </FlexBox>

        
    </FlexOuterContainer>
  )
}

export default MainFolderLibrary

{/* <FlexBox className=''>
<input className='input-md bg-gray-100' placeholder='search file and folder'/>
</FlexBox>
<FlexBox className="relative px-5">
<Text className='font-semibold text-text-primary text-opacity-80 after:content-[""] after:absolute after:w-[80%] after:h-[1px] after:left-[10.5rem] after:top-[0.75rem] after:bg-black'>Recently Accessed</Text>
</FlexBox> */}

{/* <FlexBox className='flex justify-between'>
<FlexBoxInner className='border flex-grow mx-5'>
    <div className='flex space-x-4'>
        {
            folder_data?.map((folder, index) => {
                return(
                    <FlexBox className='w-13 h-13' key={index}  >
                        <FlexBoxInner className='flex flex-col justify-center items-center pb-5'>
                            <AiFillFolder size={60} />
                            <Text className='text-[#333] text-nowrap text-[12px]'>
                                {folder.folder_name}
                            </Text>
                        </FlexBoxInner>
                        </FlexBox>
                )
            })
        }

    </div>
</FlexBoxInner>
<FlexBoxInner>
    sadsadas
</FlexBoxInner>


</FlexBox> */}