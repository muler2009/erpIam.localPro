import React, { useState, useEffect } from 'react'
import { ModalBody, ModalContainer, ModalHeader } from '../../../../iam/components/reusable'
import { Text, FlexBox, FlexBoxInner, FlexInnerContainer } from '../../../../components/common/StyledComponent'
import * as Vsc from 'react-icons/vsc'
import { FolderGridView, FolderListView } from '.'

import Tooltip from '../../../../iam/components/reusable/Tooltip';
import { folder_modal_top_menu } from '../../../constants/menu-items/folderOptions';

import useFolderActions from '../../../hooks/useFolderActions';
import FolderContentModal from './FolderContentModal';
import * as Fa6Icons from 'react-icons/fa6' 
import FileExplorerIndicator from '../folders/FileExplorerIndicator';
import useFolderExplorerActions from '../../../hooks/useFolderExplorerActions';
import { FolderDataInterface } from '../../../models/folder-models';
import { FolderExplorerProvider, useFolderExplorer } from '../../../context/FolderExplorerContext';
import Breadcrumbs, { TestComponent } from '../../../context/Breadcrumbs';
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { FolderListProps } from '../../../models/folder-models';

const FolderList = ({ handleOptionsAction, title, folder_data, abbreviation}: FolderListProps) => {
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid")
 
  const [openFolderId, setOpenFolderId] = useState<{[key: string]: boolean}>({})
  const {handleBackClick, currentPath, getBreadcrumbs, setCurrentPath} = useFolderExplorerActions(folder_data)

  const handleFolderTopMenuModals = (label: string) => {
    setOpenFolderId(prevState => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };
 
  return (
      <ModalContainer className={`w-[60%] h-[55vh] mx-auto  border  flex flex-col relative top-[9%] shadow-2xl rounded-t`}>
        <ModalHeader className='flex flex-col pl-5 border-b-[1px] bg-gray-100 font-Poppins gap-2 rounded-t-md'>
          <FlexBox className='flex justify-between items-center'>
            <Text className='font-Poppins text-[13px] flex justify-center px-5 text-[#333] text-opacity-60'>{title}</Text>
            <FlexBoxInner className='pb-5'>
              <FlexBoxInner className="flex justify-between items-center cursor-pointer border rounded-t hover:bg-[#bf503c] hover:text-white"> 
                <div className='flex px-5 py-[2px]' onClick={handleOptionsAction}>
                   {
                      Vsc.VscClose({
                          size: 15
                      })
                      }
                </div>
              </FlexBoxInner>
            </FlexBoxInner>
          </FlexBox>
          {/* <TestComponent viewMode={viewMode} setViewMode={setViewMode} /> */}
        </ModalHeader>
        <ModalBody className='bg-[#fff] h-[55vh] w-full overflow-y-scroll '>  
          <FlexBox className="flex border-r h-full shadow-md">
            <FlexBoxInner className='w-1/5 bg-gray-50'>
              asdasd
            </FlexBoxInner>
            <FlexBoxInner className="flex-grow">
              <FlexBox className='flex-wrap'>
                  {
                    folder_data.subfolder?.length ? (
                      <div>
                        {
                          viewMode === 'grid' ? (
                              <FolderGridView folder_data={folder_data} />
                          ) : (
                              <FolderListView folder_data={folder_data} />
                          )
                        }
                      </div>

                    ):(
                      <div className="flex justify-center items-center">
                          <Text>Folder is empty</Text>
                      </div>
                    )
                  }
              </FlexBox>

              <>
                { 
                  folder_modal_top_menu?.map(menu => (
                      <FolderContentModal
                          openFolderId={openFolderId[menu.identifier]}
                          handleOptionsAction={() => setOpenFolderId(prevState => ({ ...prevState, [menu.identifier]: false }))}
                          title={folder_data.folder_name}
                          abbreviation={menu.identifier}
                          folder_data={folder_data}
                      />  
                  ))
                }
              </>
            </FlexBoxInner>

          </FlexBox>
        </ModalBody>
      </ModalContainer>
  
  )
}

export default FolderList


    {/* <FlexBoxInner className='flex flex-grow space-x-2'>
            {
              folder_modal_top_menu?.map((menu, index) => {
                return(
                  <FlexBoxInner key={index} className="flex items-center space-x-1 px-2" onClick={() => handleFolderTopMenuModals(menu.identifier)}>
                      <span>{menu.icon}</span>
                      <Text className='text-[13px]'>{menu.label}</Text>
                  </FlexBoxInner>
                )
              })
            }
          </FlexBoxInner> */}



