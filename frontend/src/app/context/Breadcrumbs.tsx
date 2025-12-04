import React from 'react';
import { useFolderExplorer } from './FolderExplorerContext';
import { FolderDataInterface } from '../models/folder-models';
import useFolderExplorerActions from '../hooks/useFolderExplorerActions';
import { FlexBox, FlexBoxInner  } from '../../components/common/StyledComponent';
import Tooltip from '../../iam/components/reusable/Tooltip';
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { MdOutlineFormatListBulleted } from "react-icons/md";

const Breadcrumbs = ({folder_data}: {folder_data: FolderDataInterface}) => {
  
  const { currentPath, setCurrentPath, handleBackClick, handleItemClick, currentFolder, getBreadcrumbs } = useFolderExplorerActions(folder_data)

  const renderBreadcrumbs = () => {
    const breadcrumbs = getBreadcrumbs();
    console.log(breadcrumbs)
    return (
      <div className="flex">
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

  return renderBreadcrumbs
}

  

  // return (
  //   <div className="breadcrumbs">
  //     {breadcrumbs.map((item, index) => (
  //       <span key={item.folder_identifier}>
  //         <span onClick={() => setCurrentPath(currentPath.slice(0, index))} style={{ cursor: 'pointer', color: 'blue' }}>
  //           {item.folder_name}
  //         </span>
  //         {index < breadcrumbs.length - 1 && " > "}
  //       </span>
  //     ))}
     
  //   </div>
  // );
// };

export default Breadcrumbs;


interface TestInterface {
  viewMode: "grid" | "list";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>
}

export const TestComponent = ({viewMode, setViewMode}: TestInterface) => {


  return(
    <FlexBox className='flex justify-between items-center bg-[#fafafa] bg-opacity-50 py-3 border-b border-[#fafafa] pl-4'>      
    <FlexBoxInner className='flex justify-between items-center space-x-3 pr-2'>  
      <div className='flex items-center justify-center space-x-1 cursor-pointer pr-5'>
        <Tooltip content={`Show Grid View`}>
          {
            TfiLayoutGrid2Alt({
              size: 25, 
              onClick: () => setViewMode("grid"),
              className: `${viewMode === 'grid' ? "text-[#26cc86] transition duration-500 ease-in-out" : "tetxt-[#333]"}`
            })
          }

        </Tooltip>
        <Tooltip content={`List View`}>
           {
            MdOutlineFormatListBulleted({
              size: 25, 
              onClick: () => setViewMode("list"),
              className: `${viewMode === 'list' ? "text-[#26cc86] transition duration-500 ease-in-out" : "tetxt-[#333]"}`
            })
          }

        </Tooltip>
      </div>
    </FlexBoxInner>
  </FlexBox>
  )

}