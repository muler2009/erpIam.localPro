import React from 'react'
import { useUnLockAccaountManuallyMutation } from '../../../features/auditLogsAPI'
import useErrorState from '../../../hooks/useErrorState'
import { AccessFailureLogsInterface } from '../../../models/sys_audit_interface';

interface UseUnlockAccountProps {
  rowData: AccessFailureLogsInterface;  // define the correct type
  handleIsOpenCloseMenuModal: () => void;
}

const useUnlockAccount = ({rowData, handleIsOpenCloseMenuModal}: UseUnlockAccountProps) => {
  const [unLockAccaountManually] = useUnLockAccaountManuallyMutation()
  const {setErrorMessage, setErrors, setTriggerMessageModal} = useErrorState()
  
  const onUnlockButtonClicked = async() => {
    try{
      const response = await unLockAccaountManually({ username: rowData?.username }).unwrap()
      if (response.status_code === 201){
        handleIsOpenCloseMenuModal()
      }
    }catch(error: any){
      console.log(error)
      if(!error) {
        console.log(error)
      } else if(error.data.status_code === 409 ){
        setErrorMessage({
          error_type: error.data?.error_type,
          message: error.data?.message,
          status_code: error.status_code
        });
        setErrors(true);
        setTriggerMessageModal(prev => !prev);
      } else if(error.data.status_code === 400 ){
        setErrorMessage({
          error_type: error.data?.error_type,
          message: error.data?.message,
          status_code: error.status_code
        });
        setErrors(true);
        setTriggerMessageModal(prev => !prev);
      }
    }
}
  return {
    onUnlockButtonClicked
  }
}

export default useUnlockAccount