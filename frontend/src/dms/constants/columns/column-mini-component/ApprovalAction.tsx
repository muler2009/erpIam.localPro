import React, { useState } from 'react'
import { ModalContainer, ModalWrapper, ModalHeader, ModalBody } from '../../../../iam/components/reusable';
import { Div, FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent';
import * as VscIcons from 'react-icons/vsc'
import { IntermediateAPIResponse } from '../../../models/request-model';
import TextInput from '../../../../components/common/TextInput';
import { ApprovalSelect } from '../useRequestReceivedColumn';
import {format} from 'date-fns'
import PdfReader from '../../../components/common/PDFReader';
import PerformTransition from './PerformTransition';



interface ApprovalActionInterface {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    requestData: IntermediateAPIResponse;
    approvalStatus: Record<string | number, string>

}

const ApprovalAction = ({open, handleIsOpenCloseMenuModal, requestData} : ApprovalActionInterface) => {

    const [approvalStatus, setApprovalStatus] = useState<Record<string | number, string>>({});
    const [openPdfs, setOpenPdfs] = useState<boolean>(false)

    const handleApprovalChange = (rowId: string | number, status: string) => {
        setApprovalStatus(prev => ({ ...prev, [rowId]: status }));
    };
    const date = requestData.request?.request_sent_at || new Date()
  return (
    open ? (
        <ModalWrapper>
            <ModalContainer className='w-[50%] mx-auto my-10 flex flex-col border-[1px] border-[#ddd] shadow-xl rounded-[5px] relative top-[5%]'>
                <ModalHeader className='py-[10px] px-5 flex justify-between items-center cursor-pointer bg-[#e6e6e6] rounded-t-[4px] border-b border-gray-400 border-opacity-50'>
                    <Text className=' text-[15px] font-Rubik flex justify-center items-center'>
                        <span className='mr-2'>
                            {/* <GiConfirmed size={25}/>  */}
                        </span>
                        Request Detail
                    </Text>
                    <VscIcons.VscClose size={20}  onClick={handleIsOpenCloseMenuModal} />
                    
                </ModalHeader>

                <ModalBody className='bg-gray-50 flex space-x-1 p-[1px] pb-5 h-[60vh]'>
                    <FlexBox className='flex flex-col gap-1 w-[40%]'>
                        <FlexBoxInner className='bg-white p-5 border'>
                            {requestData.request?.request_type}
                        </FlexBoxInner>
                        <FlexBoxInner className='bg-white border p-5'>
                            Versioning
                        </FlexBoxInner>
                    </FlexBox>
                    <FlexBox className='bg-white flex-grow border '>
                        <FlexBoxInner className='pt-5 flex flex-col'>
                            <FlexBoxInner className='px-3 flex flex-col gap-2'>
                                <Text className='font-IBMPlexSans font-semibold text-[16px] leading-[1.5] text-primary-green'>Request Information</Text>
                                <table className='flex flex-col gap-2'>
                                    <tr className='flex space-x-5'>
                                        <th>Request ID: </th>
                                        <td className='text-[11px]'>{requestData.request?.request_id}</td>
                                    </tr>
                                    <tr className='flex space-x-5'>
                                        <th>Request Type: </th>
                                        <td className='text-[11px]'> {requestData.request?.request_type}</td>
                                    </tr>
                                    <tr className='flex space-x-5'>
                                        <th>Status</th>
                                        <td className='text-[11px]'>{requestData.request?.current_state}</td>
                                    </tr>
                                    <tr className='flex space-x-5'>
                                        <th>Requeste</th>
                                        <td className='text-[11px]'>{format(date, 'EE dd, yyyy')}</td>
                                    </tr>
                                        <tr className='flex space-x-5'>
                                        <th>Attachment</th>
                                        <td className='text-blue-400 hover:underline'>
                                            <p onClick={() => setOpenPdfs(prev => !prev)}>{requestData.request?.file_name}</p>
                                        </td>
                                    </tr>
                                </table>
                                <PdfReader pdfURL={`${requestData.request?.file_url}`}  openPdfs={openPdfs} setOpenPdfs={setOpenPdfs} />                               
                            </FlexBoxInner>

                            <FlexBoxInner className='px-3 pt-3'>
                                <Div className='bg-gray-50 border w-[20%] px-5 py-1'>Comment </Div>
                                <TextInput 
                                    type='text'
                                    placeholder='Comment while approval'
                                    name='dec'
                                    className="input-md text-sm"
                                    rows={5}
                                    desc='optional'

                                />
                            </FlexBoxInner>

                            <FlexBoxInner className='px-3 py-4 flex flex-col gap-2'>
                                <Div className='flex flex-col'>
                                    <Text>Approval Action</Text>
                                    <p className='text-[11px] text-[#333] text-opacity-55'>select approval action and click the button to take action</p>
                                </Div>
                                <ApprovalSelect 
                                    rowId={requestData.request?.request_id} 
                                    onApprovalChange={handleApprovalChange}
                                    currentStatus={approvalStatus[requestData.request?.request_id] }
                                    rowData={requestData}
                                />
                                
                                <PerformTransition 
                                    rowData={requestData} 
                                    approvalStatus={approvalStatus[requestData.request?.request_id] }
                                    
                                 />

                            </FlexBoxInner>

                            
                        </FlexBoxInner>
                    </FlexBox>
                </ModalBody>
            </ModalContainer>

        </ModalWrapper>

    ): null
  )
}

export default ApprovalAction