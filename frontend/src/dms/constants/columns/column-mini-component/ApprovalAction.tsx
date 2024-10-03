import React, { useState } from 'react'
import { ModalContainer, ModalWrapper, ModalHeader, ModalBody, ModalFooter } from '../../../../iam/components/reusable';
import { Div, FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent';
import * as VscIcons from 'react-icons/vsc'
import { IntermediateAPIResponse } from '../../../models/request-model';
import TextInput from '../../../../components/common/TextInput';
import { ApprovalSelect } from '../useRequestReceivedColumn';
import {format} from 'date-fns'
import PdfReader from '../../../components/common/PDFReader';
import PerformTransition from './PerformTransition';
import {HiOutlineDocument} from 'react-icons/hi'
import PDFInlineReader from '../../../components/common/PDFInlineReader';
import * as RxIcons from "react-icons/rx";


interface ApprovalActionInterface {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    requestData: IntermediateAPIResponse;
    approvalStatus: Record<string | number, string>

}

const ApprovalAction = ({open, handleIsOpenCloseMenuModal, requestData} : ApprovalActionInterface) => {

    const [approvalStatus, setApprovalStatus] = useState<Record<string | number, string>>({});
    const [openPdfs, setOpenPdfs] = useState<boolean>(false)
    const [comments, setComments] = useState<string>()
    const [approvalPolicy, setApprovalPolicy] = useState<boolean>(false)

    const handleApprovalChange = (rowId: string | number, status: string) => {
        setApprovalStatus(prev => ({ ...prev, [rowId]: status }));
    };
    const date = requestData.request?.request_sent_at || new Date()
    console.log(requestData.request?.file_for_approval?.version_number)
  return (
    open ? (
        <ModalWrapper>
            <ModalContainer className={`mx-auto flex flex-col border-[1px] border-[#ddd] shadow-xl rounded-[5px] relative top-[5%] h-[80vh] ${approvalPolicy ? 'w-[60%]' : 'w-[35%]'}`}>
                <ModalHeader className='py-[10px] px-5 flex justify-between items-center cursor-pointer bg-[#e6e6e6] rounded-t-[4px] border-b border-gray-400 border-opacity-50'>
                    <Text className=' text-[14px] font-Poppins flex justify-center items-center'>
                        <span className='mr-2'>
                            {/* <GiConfirmed size={25}/>  */}
                        </span>
                        Request Approval Plugin
                    </Text>
                    <VscIcons.VscClose size={20}  onClick={handleIsOpenCloseMenuModal} />   
                </ModalHeader>

                <ModalBody className={`bg-gray-50 flex space-x-1 p-[1px] h-[60vh]`}>
                    <FlexBox className='flex-grow border h-full'>
                 
                        <FlexBoxInner className='pt-5 flex flex-col space-y-1 px-4 relative'>
                            <Div className='flex justify-between items-center space-x-1 pl-3 relative z-50'>
                                <div className='flex justify-start items-center space-x-1 px-3'>
                                    <span className='ring-2 ring-yellow-500  text-yellow-700 font-semibold rounded-full px-4'>pending</span>
                                    <Text className='flex-grow pl-3'>{requestData?.request.requesting_user}, Ethiopia</Text>
                                </div>
                                {
                                    openPdfs && <span>
                                        <Text className='text-red-400' onClick={() =>setOpenPdfs(false)}>Close pdf</Text>     
                                    </span>
                                }
                                <div onClick={() => setApprovalPolicy(prev => !prev)} className="cursor-pointer w-8 h-8 ring-2 ring-slate-50 rounded-full absolute flex justify-center items-center -right-9 bg-black text-white z-auto">
                                    { 
                                        approvalPolicy ? <RxIcons.RxCaretLeft  /> :  <RxIcons.RxCaretRight/>
                                    }
                                </div>
                            </Div>

                            <Div className='pt-1'>
                                {
                                    openPdfs ? ( 
                                        <Div className='h-[60vh] overflow-y-scroll overflow-x-scroll'>

                                            <PDFInlineReader pdfURL={`${requestData.request?.file_url}`} />
                                        </Div>
                                    ) : (
                                        <>
                                        
                                        <Div className='pt-3 pb-2 flex flex-col space-y-1'>
                                            <div className='flex justify-start items-center space-x-1 px-3 bg-white py-2'>
                                                <Text className='w-1/4'>Request_Made_on</Text>
                                                <Text className='flex-grow font-semibold px-4'>{format(date, 'EE, mm, yyyy')}</Text>
                                            </div>
                                            <div className='flex justify-start items-center space-x-1 px-3 bg-white py-2'>
                                                <Text className='w-1/4'>Request_Type</Text>
                                                <Text className='flex-grow font-semibold px-4'>{requestData?.request.request_type}</Text>
                                            </div>
                                            <div className='flex justify-start items-center space-x-1 px-3 bg-white py-2'>
                                                <Text className='w-1/4'>Approved_by</Text>
                                                <Text className='flex-grow font-semibold px-4'>{requestData?.user}</Text>
                                            </div>
                                            <div className='flex justify-start items-center space-x-1 px-3 bg-white py-2'>
                                                <Text className='w-1/4'>Duration</Text>
                                                <Text className='flex-grow font-semibold px-4'>3 days ago</Text>
                                            </div>
                                            <div className='flex justify-start items-center space-x-1 px-3 bg-white py-2'>
                                                <Text className='w-1/4'>Attachment</Text>
                                                <Text className='flex-grow px-4  text-blue-600 hover:underline' onClick={() => setOpenPdfs(true)}>{requestData?.request?.file_name}</Text>
                                            
                                            </div>
                                            <div className='flex justify-start items-center space-x-1 px-3 bg-white py-2'>
                                                <Text className='w-1/4'>Document Version</Text>
                                                <Text className='flex-grow px-4 text-nowrap text-blue-600 hover:underline'>{requestData?.request?.file_for_approval?.version_number}</Text>
                                            </div>
                                            <div className='flex justify-start items-center space-x-1 px-3 bg-white py-2 border rounded-[3px] border-indigo-600'>
                                            Comment: On the Enterprise plan, organization admins can approve plugins and widgets on a workspace-by-workspace basis. As a result, you might only be able to use a plugin or widget in one workspace, but not another.
                                            </div>
                                            
                                           
                                        </Div>
                                        <Div className='bg-white px-3 py-2 h-full'>
                                            <TextInput 
                                                label='Provide your comment'
                                                type='text'
                                                placeholder='Comment while approval'
                                                name='comments'
                                                className="input-md text-sm"
                                                rows={5}
                                                desc='optional'
                                                value={comments}
                                                onChange={(event: any) => setComments(event.target.value)}

                                            />

                                        </Div>
                        
                                        </>

                                    )
                                }

                            </Div>


                        </FlexBoxInner>
                    </FlexBox>

                    {
                        approvalPolicy && (
                            <Div className="ml-4 w-[50%] h-full overflow-y-scroll bg-white border  transition-transform duration-300 ease-in-out">
                                <p className="font-bold text-sm p-4 text-center">Approval Requirement</p>
                                    <Div className="px-4 py-2">
                                        {/* Policy details go here */}
                                        <p>Policy 1 details</p>
                                        <p>Policy 2 details</p>
                                        {/* Add more policy items as needed */}
                                    </Div>
                            </Div>
                        )
                    }
                </ModalBody>
                <ModalFooter className='border-t bg-white z-50'>
                    <FlexBoxInner className='px-3 pt-3 flex flex-col gap-2'>
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
                            comments={comments}
                            handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
                            
                        />

                    </FlexBoxInner> 
                </ModalFooter>
            </ModalContainer>

        </ModalWrapper>

    ): null
  )
}

export default ApprovalAction