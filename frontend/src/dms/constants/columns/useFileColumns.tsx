import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { FileUploadColumnInterface } from "../../models/file-models.";
import { FlexBox, FlexBoxInner, P, Text } from "../../../components/common/StyledComponent";
import {BsFiletypePdf} from 'react-icons/bs'
import { format } from "date-fns";
import { username } from "../../../iam/api/auth";
import { useSelector, UseSelector } from "react-redux";
import BottomTooltip from "../../../components/common/BottomTooltip";
import { MdOutlinePreview } from "react-icons/md";
import PdfReader from "../../components/common/PDFReader";

const fileColumnsHelper = createColumnHelper<FileUploadColumnInterface>()

const OwnerCell = () => {
    const user = useSelector(username); // Adjust the selector as necessary
    return (
        <FlexBox>
            {user}
        </FlexBox>
    );
};

const useFileColumns = () => {
    const fileColumn = useMemo(
        () => [
            fileColumnsHelper.display({
                id: "selection",
                header: ({table}) => {
                    return(
                        <input 
                            type='checkbox'
                            onChange={table.getToggleAllPageRowsSelectedHandler()}
                            checked={table.getIsAllRowsSelected()}
                            className="w-[14px] h-[14px] rounded-none appearance-auto checked:appearance-none checked:bg-blue-500 before:checked:text-white" 
                        />
                    )
                },

                cell: ({row}) => {
                    return(
                        <input 
                            type='checkbox'
                            onChange={row.getToggleSelectedHandler()}
                            checked={row.getIsSelected()}
                            className="w-[14px] h-[14px] rounded-none appearance-auto checked:appearance-none checked:bg-primary-green before:checked:text-white"  
                        />
                    )
                },
                
            }),
            fileColumnsHelper.accessor(row => row.uploaded_file, {
                id: 'uploaded_file',
                header: () => <span>File name</span>,
                cell: ({row}) => {
                    return(
                        <FlexBox className="flex space-x-2">
                             <BsFiletypePdf size={40} color='green' />
                             <FlexBoxInner className="flex flex-col items-start justify-center">
                                <Text className="font-semibold"> {row.original.document_name}</Text>
                                <P className="text-[10px] text-[#333] text-opacity-50">12kb</P>

                             </FlexBoxInner>
                           
                        </FlexBox>
                    )
                }

            }),
            fileColumnsHelper.accessor(row => row.uploaded_file_date, {
                id: 'uploaded_file_date',
                header: () => <span>Date Uploaded</span>,
                cell: ({row}) => {
                    const date_uploaded = row.original.uploaded_file_date || new Date()
                    return(
                        <FlexBox>
                           {format(date_uploaded, 'EEE dd yyyy')}
                        </FlexBox>
                    )
                }
            }),
            fileColumnsHelper.accessor(row => row.updated_file_date, {
                id: 'updated_file_date',
                header: () => <span>Last Upated</span>,
                cell: ({row}) => {
                    const date_updated = row.original.updated_file_date || new Date()
                    return(
                        <FlexBox>
                           {format(date_updated, 'EEE dd yyyy')}
                        </FlexBox>
                    )
                }
            }),
            fileColumnsHelper.display({
                id: "uploaded_by",
                header: () => <span>Owner</span>,
                cell: props => <OwnerCell  />
            }),
            fileColumnsHelper.display({
                id: "uploaded_by",
                header: () => <span></span>,
                cell: ({row}) => {
                    const rowData = row.original
                    return(
                        <ReadFile rowData={rowData} />
                    )
                }
            }),

        ], [])


        return{fileColumn}
}


const ReadFile = ({rowData}: {rowData: FileUploadColumnInterface}) => {

    const [openPdfs, setOpenPdfs] = useState<boolean>(false)
    return(
        <>
        
        <FlexBox className="flex justify-end items-center pr-20 invisible group-hover:visible">
            <BottomTooltip content={`Share`}>
                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => setOpenPdfs(prev => !prev)}>
                    <MdOutlinePreview size={15} />
                </FlexBoxInner>
            </BottomTooltip>
        </FlexBox>

        <PdfReader pdfURL={`${rowData.file_url}`}  openPdfs={openPdfs} setOpenPdfs={setOpenPdfs} />

        </>
    )
}


export default useFileColumns