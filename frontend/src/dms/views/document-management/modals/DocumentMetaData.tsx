import React from 'react'
import { ModalBody, ModalContainer, ModalHeader, ModalWrapper } from '../../../../iam/components/reusable'
import { DocumentPropsInterface, ModalComponentPropsInterface } from '../../../models/common-models'
import { Div, FlexBox, FlexBoxInner, Text, P } from '../../../../components/common/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import * as BsIcons from "react-icons/bs";
import { format } from 'date-fns'
import { metaDataMenu } from '../../../constants/menu-items/client'
import { Link } from 'react-router-dom'
import { useGetAllRequestQuery } from '../../../services/requestAPISlice'
import SharedTable from '../../../components/tables/SharedTable'
import useMetadataColumn from '../../../constants/columns/metaColumns'

const DocumentMetaData = ({open, handleIsOpenCloseMenuModal, title, rowMetaData}: DocumentPropsInterface) => {
   const date = rowMetaData.request_sent_at || new Date()
   const {data} = useGetAllRequestQuery()
   const {metaColumn} = useMetadataColumn()

  return (
    open ? (
        <ModalWrapper>
            <ModalContainer className={`w-[60%] mx-auto bg-[#fff] flex flex-col relative top-[6%] shadow-2xl rounded-md`}>
                <ModalHeader className='flex py-2 px-5 justify-between items-center cursor-pointer bg-[#e6e6e6] rounded-t-[4px] border-b border-gray-400 border-opacity-50'>
                    <Text className=' text-[15px] flex justify-center items-center '>
                        Metadata - {rowMetaData.title}
                    </Text>
                    <Div className='w-5 h-5 flex justify-center items-center hover:bg-red-500 rounded-full hover:text-white'>
                        <VscIcons.VscClose size={20} onClick={handleIsOpenCloseMenuModal}  />
                    </Div>
                </ModalHeader>
                <ModalBody className='flex justify-start gap-5 pb-5'>
                    <FlexBox className='flex flex-col gap-3 py-5'>
                        <FlexBoxInner className='flex space-x-2 pl-10 py-5'>
                            <BsIcons.BsFiletypePdf size={50} className='text-red-700'/>
                            <Div className='flex flex-col gap-[2px] justify-center'>
                                <Text className='text-[20px] font-semibold font-IBMPlexSans'>{rowMetaData.title}</Text>
                                <Text className='text-[12px] hover:text-blue-500 hover:underline'>{rowMetaData.file_name}</Text>   
                            </Div>
                        </FlexBoxInner>
                        <Div className='flex flex-col gap-0 pl-10'>
                            <Text className='text-[14px] font-bold'>Notes</Text>
                            <P className=''>note ot link of the document if it is available</P>
                        </Div>
                        <Div className='flex flex-col gap-0 pl-10'>
                            <Text className='text-[14px] font-bold'>Tags</Text>
                            <P className=''>note ot link of the document if it is available</P>
                        </Div>
                        <Div className='flex flex-col gap-0 pl-10'>
                            <Text className='text-[14px] font-bold'>Signed By</Text>
                            <P className=''>Approver name</P>
                        </Div>
                        <FlexBoxInner className='flex justify-between items-center pr-5'>
                            <Div className='flex flex-col gap-0 pl-10'>
                                <Text className='text-[14px] font-semibold'>Document ID</Text>
                                <P className=''>Approver name</P>
                            </Div>
                             <Div className='flex flex-col gap-0 pl-10'>
                                <Text className='text-[14px] font-bold'>Uploaded date</Text>
                                <P className=''>{format(date, 'EE, dd yyyy')}</P>
                            </Div>
                        </FlexBoxInner>

                    </FlexBox>
                    <FlexBox className='flex-grow'>
                        <FlexBoxInner className='flex justify-between items-center'>
                            <Text className='text-[14px] flex justify-start items-baseline'>Other Version</Text>
                
                            <Div className="flex justify-end pr-2">
                                {
                                        metaDataMenu?.map((metaDataInfo, index) => {
                                        return(
                                            <FlexBoxInner className='flex pt-4' key={index}>
                                                {
                                                    metaDataInfo.miniWindow ? (
                                                        <Div className='flex justify-center items-center space-x-3text-[#fff] hover:bg-gray-50' onClick={handleIsOpenCloseMenuModal}>  
                                                            <Text className='text-[12px]  px-3 rounded-[3px] py-2 flex items-center'>
                                                                <span className='pr-2'>
                                                                    {metaDataInfo.icon}
                                                                </span>
                                                                {metaDataInfo.label}
                                                            </Text>
                                                        </Div>
                                                        ) : (
                                                        <Link className='flex justify-center items-center space-x-3 hover:bg-gray-50' to={metaDataInfo.path || ""}>
                                                            <Text className='text-[12px] px-3 rounded-[3px] py-2 flex items-center'>
                                                                <span className='pr-2'>
                                                                    {metaDataInfo.icon}
                                                                </span>
                                                                {metaDataInfo.label}
                                                            </Text>
                                                        </Link>
                                                    )
                                                }
                                            </FlexBoxInner>
                                        )
                                        })
                                    }

                            </Div>
                        </FlexBoxInner>
                        <FlexBoxInner>
                            {
                                data?.length && (
                                    <SharedTable 
                                        columns={metaColumn}
                                        data={data}
                                    />
                                )
                            }
                        </FlexBoxInner>

                      

                    </FlexBox>
                </ModalBody>
            </ModalContainer>
        </ModalWrapper>
    ): null
  )
}

export default DocumentMetaData