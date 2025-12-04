import { useState } from "react"
import { IntermediateAPIResponse, RequestDataInterface } from "../../../models/request-model"
import { FlexBox, FlexBoxInner, Text } from "../../../../components/common/StyledComponent"
import BottomTooltip from "../../../../components/common/BottomTooltip"
import { GrAttachment } from "react-icons/gr";
import PdfReader from "../../../components/common/PDFReader";
 


const OpenFileForReview = ({rowData}: {rowData: IntermediateAPIResponse }) => {
    const [openPdfs, setOpenPdfs] = useState<boolean>(false)
    return(
        <>
            <FlexBox className="flex justify-start items-center pr-20">
                <BottomTooltip content={`Share`}>
                    <FlexBox className='flex items-center space-x-2'>
                        { rowData.request?.file_name && 
                            <span>
                                {GrAttachment({size: 15, className:'text-[#333] text-opacity-65' })}
                            </span> 
                        }
                        <Text className='text-blue-500 hover:underline text-nowrap' onClick={() => setOpenPdfs(prev => !prev)}>{rowData.request?.file_name}</Text>
                    </FlexBox>
                </BottomTooltip>
            </FlexBox>

            <PdfReader pdfURL={`${rowData.request?.file_url}`}  openPdfs={openPdfs} setOpenPdfs={setOpenPdfs} />

        </>
    )
}


export const ReadFileForReview = ({rowData}: {rowData: RequestDataInterface }) => {
    const [openPdfs, setOpenPdfs] = useState<boolean>(false)
    return(
        <>
            <FlexBox className="flex justify-start items-center pr-20">
                <BottomTooltip content={`Share`}>
                    <FlexBox className='flex items-center space-x-2'>
                        { rowData.file_name && <span>
                            {
                                GrAttachment({size: 15, className:'text-[#333] text-opacity-65' })
                            }
                           
                            </span> }
                        <Text className='text-blue-500 hover:underline' onClick={() => setOpenPdfs(prev => !prev)}>{rowData.file_name}</Text>
                    </FlexBox>
                </BottomTooltip>
            </FlexBox>

        <PdfReader pdfURL={`${rowData.file_url}`}  openPdfs={openPdfs} setOpenPdfs={setOpenPdfs} />

        </>
    )
}

export default OpenFileForReview