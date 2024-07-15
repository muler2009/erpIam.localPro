import { createColumnHelper } from "@tanstack/react-table";
import { FolderColumn } from "../../models/folder-models";
import { useMemo } from "react";
import { P, FlexBox } from "../../../components/common/StyledComponent";



const subColumnFolder = createColumnHelper<FolderColumn>()

const useSubFolderColumns = () => {
    const subFolderColumns = useMemo(
        () => [
            subColumnFolder.accessor(row => row.folder_name, {
                id: "folder_name",
                header: () => <span>Folder name</span>,
                cell: props => {
                    return(
                        <div className="before:content-[''] before:mt-3 before:h-[1px] before:absolute before:bg-[#ccc] before:w-[15px] ">
                            <div className="flex space-x-2 ml-4">
                                <span className='text-[18px]'>&#128193;</span>
                                <P>{props.getValue()}</P>

                            </div>
                        </div>
                    )
                }
            }),
            subColumnFolder.accessor(row => row.subfolder, {
                id: "subfolder",
                header: () => <span>Content</span>,
                cell: (props) => {
                    const file_folder = props.row.original.subfolder
                    return(
                        <FlexBox className='flex justify-start'>
                            {
                                file_folder?.length 
                                ? (
                                    <P className='text-[11px] text-[#333] text-opacity-50'>
                                        {file_folder.length}<span className='pl-1'>items</span>
                                    </P>
                                )
                                : <P className='text-[11px] text-[#333] text-opacity-50'>No items</P>
                            }
                        </FlexBox>
                    )
                },
            }),
            subColumnFolder.accessor(row => row.folder_created_date, {
                id: "folder_created_date",
                header: () => <span>Created date</span>,
                cell: props => props.getValue()

            })
        ], []
    )

    return { subFolderColumns }
   
}

export default useSubFolderColumns