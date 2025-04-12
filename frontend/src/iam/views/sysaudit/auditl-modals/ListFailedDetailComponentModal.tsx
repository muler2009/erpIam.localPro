import React from 'react'
import { FailedDetailComponentModalInterfacce } from '../../../models/sys_audit_interface'
import { ModalBody, ModalContainer, ModalFooter, ModalWrapper, ModalHeader } from '../../../components/reusable'
import * as VscIcons from 'react-icons/vsc'
import Accordion from '../../../components/reusable/Accordion'
import { FailedIdentityInformation, RequestAndDeviceContext, FailesEventLogs, FailesRisktLogs } from './ListFailedLogsComponents'



// failed logs detail modal for detail button of the list display
const ListFailedDetailComponentModal = ({open, handleIsOpenCloseMenuModal, title, data}: FailedDetailComponentModalInterfacce ) => {
  const listData = [
    { id: 1, title: 'Identity Information', content: <FailedIdentityInformation data={data} /> },
    { id: 2, title: 'Request & device information', content: <RequestAndDeviceContext data={data}/> },
    { id: 3, title: 'Event Details', content: <FailesEventLogs data={data} /> },
    { id: 4, title: 'Risk and anomaly detection', content: <FailesRisktLogs data={data} /> },
  ];

  return (
    open ? (
      <ModalWrapper>
        <ModalContainer className={`w-[40%] mx-auto flex flex-col relative top-[5%] shadow-2xl rounded-[3px] animate-fade-in-up`}>
            <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-gray-50 text-[#333]'>
              <p className='font-Poppins text-left px-5 text-[14px] flex-grow '>{title}</p>
              <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-100 hover:text-red-600 text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                <VscIcons.VscClose size={15} />
              </div>
            </ModalHeader>
            <ModalBody className='bg-[#4e4e4e] flex flex-col space-y-2 h-[40vh]'>
              <Accordion accordionItems={listData} />
            </ModalBody>
          </ModalContainer>
        </ModalWrapper>
    ): null
  )
}

export default ListFailedDetailComponentModal