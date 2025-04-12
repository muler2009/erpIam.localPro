import React, {useState} from 'react'
import { AccessFailureLogsAPIInterface, AccessFailureLogsInterface } from '../../../models/sys_audit_interface'
import { BiSolidUserDetail } from "react-icons/bi";
import useUtils from '../../../../app/hooks/useUtils';
import BottomTooltip from '../../../../components/common/BottomTooltip';
import FailedLogsDetailComponent from './FailedLogsDetailComponent';

const FailureLogsDetailComponent = ({rowData}: {rowData: AccessFailureLogsAPIInterface}) => {
  
  const {open, handleIsOpenCloseMenuModal} = useUtils()

  return (
    <>
      <div className={`flex space-x-2 items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 invisible group-hover:visible text-red-500`} onClick={handleIsOpenCloseMenuModal}>
        <BottomTooltip content='show log detail' >
          <BiSolidUserDetail size={18} />
        </BottomTooltip>
      </div>

      <FailedLogsDetailComponent 
        open={open}
        handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
        title={`title`}
        rowData={rowData}

      />
    
    </>
  )
}

export default FailureLogsDetailComponent