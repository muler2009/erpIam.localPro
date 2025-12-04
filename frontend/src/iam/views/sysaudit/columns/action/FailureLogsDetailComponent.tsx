import React, {useState} from 'react'
import { AccessFailureLogsInterface } from '../../../../models/sys_audit_interface';
import { BiSolidUserDetail } from "react-icons/bi";
import useUtils from '../../../../../app/hooks/useUtils';
import BottomTooltip from '../../../../../components/common/BottomTooltip';
import FailedLogsDetailComponent from '../../auditl-modals/FailedLogsDetailComponent';

const FailureLogsDetailComponent = ({rowData}: {rowData: AccessFailureLogsInterface}) => {
  
  const {open, handleIsOpenCloseMenuModal} = useUtils()

  return (
    <>
      <div className={`flex space-x-2 items-center justify-center w-8 h-8 rounded-full hover:bg-red-400 hover:text-white invisible group-hover:visible text-red-500`} onClick={handleIsOpenCloseMenuModal}>
        <BottomTooltip content='show log detail' >
          {BiSolidUserDetail({size: 18})}
        </BottomTooltip>
      </div>

      <FailedLogsDetailComponent 
        open={open}
        handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
        title={rowData?.full_user_name || "NOT_FOUND"}
        rowData={rowData}
      />
    
    </>
  )
}

export default FailureLogsDetailComponent