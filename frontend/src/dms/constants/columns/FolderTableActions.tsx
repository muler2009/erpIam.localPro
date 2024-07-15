
import { useState } from "react";
import { folderOptions } from "../menu-items/folderOptions";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FolderContentModal } from '../../views/document-management/modals'
import { FlexBox, FlexBoxInner, P, Text } from '../../../components/common/StyledComponent'
import useFolderActions from "../../hooks/useFolderActions";

interface FolderTableActionsProps {
    row: {
      original: {
        folder_name: string;
        [key: string]: any; // For other properties in the row
      };
    };
  }

const FolderTableActions = ({ row }: FolderTableActionsProps) => {

   const { openFolderId, handleOptionsAction, handleOptionsToggle, setOpenFolderId} = useFolderActions()
 

    
    return (
        <>
            <div className='flex space-x-2 justify-start items-center relative'>
                <div className="" onClick={() => handleOptionsToggle(row.original.folder_name)}>

                    <P className='flex items-center justify-start px-2 bg-[#ccc] bg-opacity-30 text-[12px] py-1' >
                        Options
                        <span>
                            { openFolderId[row.original.folder_name] ? <RxCaretLeft /> : <RxCaretRight />}
                        </span>
                    </P>
    
                        {
                            openFolderId[row.original.folder_name] && (
                                <FlexBox className={`absolute top-0 left-[27%] w-[200px] whitespace-nowrap z-50 bg-gray-200 bg-opacity-50 my-2`} >
                                    {

                                        folderOptions?.map((options, index) => (
                                            <div key={index} className='flex space-x-2 justify-start items-center py-1 px-2 hover:bg-blue-800 hover:text-white' onClick={() => handleOptionsAction(options.abbreviation)}>
                                            <div>{options.icon}</div>
                                                <Text className=''>
                                                    {options.label}
                                                </Text>
                                            </div>
                                        ))
                                    }
                                </FlexBox>
                        )}
                </div>

                <div className="">
                    { 
                        folderOptions?.map(folder => (
                            <FolderContentModal
                                openFolderId={openFolderId[folder.abbreviation]}
                                handleOptionsAction={() => setOpenFolderId(prevState => ({ ...prevState, [folder.abbreviation]: false }))}
                                title={row.original.folder_name}
                                abbreviation={folder.abbreviation}
                                data={row.original}
                            />
                            
                        ))
                    }
                </div>
            </div>

        </>
    );
};


export default FolderTableActions