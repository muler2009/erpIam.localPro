import { useState, useEffect } from 'react';
import { FlexInnerContainer, FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'
import { AiFillFolder } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import PdfReader from '../../../components/common/PDFReader';
import useFolderExplorerActions from '../../../hooks/useFolderExplorerActions';
import Tooltip from '../../../../iam/components/reusable/Tooltip';
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import * as Fa6Icons from 'react-icons/fa6' 
import { FolderGridViewInterface } from '../../../models/folder-models';


export const GridView = ({folder_data} : FolderGridViewInterface) => {

  const [openStates, setOpenStates] = useState<boolean[]>([]);
  const [openPdfs, setOpenPdfs] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid")
  
  const { currentPath, setCurrentPath, handleBackClick, handleItemClick, currentFolder, getBreadcrumbs, handleForwardClick } = useFolderExplorerActions(folder_data)

  const renderBreadcrumbs = () => {
    const breadcrumbs = getBreadcrumbs();
    console.log(breadcrumbs)
    return (
      <div className="flex space-x-2">
        {breadcrumbs.map((item, index) => (
          <span key={index}>
            <span 
              onClick={() => setCurrentPath(currentPath.slice(0, index))}
              style={{ cursor: 'pointer', color: 'blue' }}
            >
              {item.folder_name}
            </span>
            {index < breadcrumbs.length - 1 && ' > '} 
          </span>
        ))}
      </div>
    );
  };

  const toggleItem = (index: number) => {
    setOpenStates((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  return (
    <FlexBox className='flex flex-col justify-center'>
      {/* A section that display the folders recurrsively  */}
      <FlexBox className='flex justify-between items-center space-x-5 bg-[#f5f5f7] px-5 py-3'>
        <FlexBoxInner className='flex space-x-1'>
          {
            Fa6Icons.FaCircleArrowLeft({
              size: 60,
              onClick: handleBackClick
            })
          }

          {
            Fa6Icons.FaCircleArrowRight({
              size: 60,
              onClick: handleForwardClick
            })
          }
           
        
        </FlexBoxInner>
        <FlexBoxInner className='flex-grow'>
           {renderBreadcrumbs()}
        </FlexBoxInner>
        <FlexBoxInner className='flex justify-between items-center space-x-3 pr-2'>  
            <div className='flex items-center justify-center space-x-1 cursor-pointer pr-5'>
              <Tooltip content={`Show Grid View`}>
                {
                  TfiLayoutGrid2Alt({
                    size: 15, 
                    onClick: () => setViewMode("grid"), 
                    className: `${viewMode === 'grid' ? "text-[#26cc86] transition duration-500 ease-in-out" : "tetxt-[#333]"}`

                  })
                  
                }
              </Tooltip>
              <Tooltip content={`List View`}>
                {
                  MdOutlineFormatListBulleted({
                    size: 20, 
                    className: `${viewMode === 'list' ? "text-[#26cc86] transition duration-500 ease-in-out" : "tetxt-[#333]"}`,
                    onClick: () => setViewMode("list")

                  }) 

                }
              </Tooltip>
            </div>
        </FlexBoxInner>
      </FlexBox>
      <FlexBox className='flex flex-col gap-3 relative mt-5 mx-5'>
        <Text className='after:content-[""] after:absolute after:w-[80%] after:h-[1px] after:left-[6.5rem] after:top-[0.75rem] after:bg-gray-100'>Folders</Text>
        <FlexBoxInner className='flex gap-3 flex-wrap'>
          {
            currentFolder.subfolder?.length ? (
              currentFolder.subfolder?.map((subfolder:any, index:any) => {
                const createdDate = subfolder.folder_created_date
                  return(
                    <FlexBox className='w-13 h-13' key={subfolder.folder_identifier} onDoubleClick={() => handleItemClick(subfolder)} >
                      <FlexBoxInner className='flex flex-col justify-center items-center pb-5'>
                          {
                            AiFillFolder({
                              size: 60
                            }) 
                          }
                          <Text className='text-[#333] text-nowrap text-[12px]'>
                              {subfolder.folder_name}
                          </Text>
                      </FlexBoxInner>
                    </FlexBox>
                  )
                }) 
              ) : (
                <FlexBox className='flex justify-center items-center'>
                  <Text className=''>No Items Found</Text>
                </FlexBox>
              )
            }
        </FlexBoxInner>
      </FlexBox>
    
        {/* a section display the uploaded files and images   */}
    <FlexBox className='flex flex-col gap-3 relative mb-5 mx-5'>
        { currentFolder.uploaded_file?.length ? (
          <Text className='after:content-[""] after:absolute after:w-[80%] after:h-[1px] after:left-[5.5rem] after:top-[0.75rem] after:bg-gray-100'>Files</Text>

        ): null 
         }
        <FlexBoxInner className='flex gap-3 flex-wrap'>
          {
            currentFolder.uploaded_file?.map((uploaded: any, index: any) => {
              return(
                <FlexBox className='flex justify-between py-3 items-center border-gray-100 ' key={index} >
                  <FlexBoxInner className='flex flex-col gap-2 justify-start items-center w-13 h-13' onDoubleClick={() => toggleItem(index)}>
                    {
                      FaFilePdf({
                        size: 50,
                        color:'#de2429'
                      }) 
                    }
                    <Text className=''>{uploaded.uploaded_document_name}</Text>
                  </FlexBoxInner>                  
                  {
                    openStates[index] && <PdfReader pdfURL={`${uploaded.file_url}`}  openPdfs={openStates[index]} setOpenPdfs={(value) => toggleItem(index)} title={`text`} />
                  }   
              </FlexBox>
              )
            })
          }
      </FlexBoxInner>
    </FlexBox>
  </FlexBox>       
  );
}


export default GridView