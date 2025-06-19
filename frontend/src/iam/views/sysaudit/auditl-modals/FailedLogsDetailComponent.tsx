import React, { useState } from 'react'
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper } from '../../../components/reusable'
import { ModalComponentPropsInterface } from '../../../models/common-models'
import * as VscIcons from "react-icons/vsc"
import { AccessFailureLogsInterface, GroupedFailedAccessLog } from '../../../models/sys_audit_interface'
import Accordion from '../../../components/reusable/Accordion'
import { FailedIdentityInformation, RequestAndDeviceContext, FailesEventLogs, FailesRisktLogs } from './FailedLogsComponents'

export interface FailedLogsDetailComponentInterface extends ModalComponentPropsInterface {
    rowData: AccessFailureLogsInterface 
}

const FailedLogsDetailComponent = ({open, handleIsOpenCloseMenuModal, title, rowData}: FailedLogsDetailComponentInterface) => {
   const data = [
      { id: 1, title: 'Identity Information', content: <FailedIdentityInformation rowData={rowData} /> },
      { id: 2, title: 'Request & device information', content: <RequestAndDeviceContext rowData={rowData}/> },
      { id: 3, title: 'Event Details', content: <FailesEventLogs rowData={rowData} /> },
      { id: 4, title: 'Risk and anomaly detection', content: <FailesRisktLogs rowData={rowData} /> },
      ];
    

  return (
    open ? (
        <ModalWrapper>
          <ModalContainer className={`w-[30%] right-0 flex flex-col absolute top-[5%] shadow-2xl rounded-[3px] animate-fade-in-up mr-1`}>
              <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins border-b bg-gray-50 '>
                <p className='font-IBMPlexSans text-left px-5 text-[14px] flex-grow text-[#333] font-semibold '>{title}</p>
                <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-[5px] hover:bg-red-600 hover:text-white text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                  <VscIcons.VscClose size={15} />
                </div>
              </ModalHeader>
              <ModalBody className='bg-[#fff] flex flex-col space-y-2 h-[80vh]'>
                <Accordion accordionItems={data} />        
              </ModalBody>
            </ModalContainer>
          </ModalWrapper>
      ): null
  )
}

export default FailedLogsDetailComponent