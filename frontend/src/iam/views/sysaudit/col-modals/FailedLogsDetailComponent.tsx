import React from 'react'
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper } from '../../../components/reusable'
import { ModalComponentPropsInterface } from '../../../models/common-models'
import * as VscIcons from "react-icons/vsc"
import { AccessFailureLogsAPIInterface, AccessFailureLogsInterface } from '../../../models/sys_audit_interface'

interface FailedLogsDetailComponentInterface extends ModalComponentPropsInterface {
    rowData: AccessFailureLogsAPIInterface
}

const FailedLogsDetailComponent = ({open, handleIsOpenCloseMenuModal, title, rowData}: FailedLogsDetailComponentInterface) => {
  return (
    open ? (
        <ModalWrapper>
          <ModalContainer className={`w-[40%] mx-auto flex flex-col relative top-[5%] shadow-2xl rounded-[3px]`}>
              <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-gray-50 text-white'>
                <p className='font-Poppins text-left px-5 text-[14px] flex-grow '>{title}</p>
                <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-100 hover:text-red-600 text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                  <VscIcons.VscClose size={15} />
                </div>
              </ModalHeader>
              <ModalBody className='bg-gray-100 px-5 flex flex-col space-y-2 max-h-full'>
                <div className="flex flex-col space-y-1 text-sm">
                  <div><span className="font-medium text-gray-700">Date:</span> {rowData?.attempt_time}</div>
                  <div><span className="font-medium text-gray-700">HTTP Accept:</span> {rowData?.http_accept}</div>
                  <div><span className="font-medium text-gray-700">Failure Count:</span> {rowData?.failure_count}</div>
                  <div className="text-wrap break-words">
                    <span className="font-medium text-gray-700">User Agent:</span> {rowData?.user_agent}
                  </div>
                </div>
                <div className={``}>
                  <pre>User Information</pre>
                  <div className="bg-gray-200 text-[#333] text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(rowData?.user_info, null, 2)}
                  </div>
                </div>
               
                <div className={``}>
                  <pre>Event Information</pre>
                  <pre className="bg-gray-200 text-[#333] text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(rowData.event, null, 2)}</pre>
                </div>
                <div className={``}>
                  <p>Risk</p>
                  <pre className="bg-gray-200 text-[#333] text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(rowData.risk, null, 2)}
                  </pre>

                </div>

              </ModalBody>
            </ModalContainer>
          </ModalWrapper>
      ): null
  )
}

export default FailedLogsDetailComponent