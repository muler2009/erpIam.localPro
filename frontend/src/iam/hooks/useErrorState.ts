import React, {useState} from 'react'
import { ErrorResponseInterface } from '../models/error.model'

const useErrorState = () => {
    const [errorMessage, setErrorMessage] = useState<ErrorResponseInterface | null>(null);
    const [errors, setErrors] = useState<boolean>(false);
    const [triggerMessageModal, setTriggerMessageModal] = useState<boolean>(false);

  return{
    errorMessage,
    errors,
    triggerMessageModal,
    setErrorMessage,
    setErrors,
    setTriggerMessageModal
  }
}

export default useErrorState