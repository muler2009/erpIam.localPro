import React from 'react'
import * as GiIcons from 'react-icons/gi'
import BottomTooltip from '../../../../../components/common/BottomTooltip'
import useUtils from '../../../../../app/hooks/useUtils'
import { AccessFailureLogsInterface } from '../../../../models/sys_audit_interface'
import UnlockAccountModal from '../../auditl-modals/UnlockAccountModal'


const UnlockComponentAction = ({rowData}: {rowData: AccessFailureLogsInterface}) => {
  const {handleIsOpenCloseMenuModal, open} = useUtils()

  return (
     <>
       <div className='flex justify-center items-center py-[2px] w-[100px] text-white bg-button-primary px-2 rounded-[3px]' onClick={handleIsOpenCloseMenuModal}>
            {GiIcons.GiUnlocking({size: 15})}
            <span className='pl-1'>Unlock</span> 
        </div>
 
       {/* triggering a modal to unlock the user  */}
       <UnlockAccountModal 
          open={open}
          handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
          title={`test`}
          rowData={rowData}
        
        />
     
     </>
   )
}

export default UnlockComponentAction