import React from 'react'
import useUtils from '../../../../../../app/hooks/useUtils'
import * as FaIcons from "react-icons/fa6";
import { VscActivateBreakpoints } from "react-icons/vsc";
import BottomTooltip from '../../../../../../components/common/BottomTooltip';
import { UserAPIResponse } from '../../../../../models/user.model';
import UserActivationDeactivationModal from './UserActivationDeactivationModal';

const ActivationDeactivationTableCell = ({rowData}: {rowData: UserAPIResponse} ) => {
  const {open, handleIsOpenCloseMenuModal} = useUtils()

  return (
    <>
      <div className='flex justify-start' onClick={handleIsOpenCloseMenuModal}>
        <BottomTooltip content={`${rowData.is_active ? 'Click to deactivate' : 'Click to activate'}`}>
          {
            rowData?.is_active ? (
              <div className={`flex space-x-2`}>
                <FaIcons.FaUserCheck size={18} className={`text-green-500`} />
                <span className={`text-[#333] text-opacity-65 hover:underline hover:text-green-500`}>active</span>
              </div>
            ):(
              <div className={`flex space-x-2`}>
                <FaIcons.FaUserLock size={18} className={`text-red-500`} />
                <span className={`text-[#333] text-opacity-65 hover:underline hover:text-red-500`}>deactivated</span>
              </div>
            )
          }
        </BottomTooltip>
      </div>

      {/* triggering the modal to activate or deactivate the user  */}
      <UserActivationDeactivationModal
        open={open}
        title={`${rowData?.first_name} ${rowData?.last_name}`}
        handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
        rowData={rowData}
      />
    
    </>
  )
}

export default ActivationDeactivationTableCell