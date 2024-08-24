import React, {useState} from 'react'
import { RequestDataInterface } from '../models/request-model'

const useRequests = () => {

    const [requestData, setRequestData] = useState<RequestDataInterface>({
        title: "",
        request_type: "",
        request_assigned_to_user: "",
        file_for_approval: null as File | null,
        description: ""
    })

    const {description, ...requiredAttributes} = requestData

    const canSave = [...Object.values(requiredAttributes)].every(Boolean) 


    const handleRequestInputHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault()
      const { name, type, value} = event.target;

      setRequestData((prevData) => ({
        ...prevData,
        [name]: value
       }));
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setRequestData({
          ...requestData,
          file_for_approval: event.target.files[0],
        });
      }
    };

  
  


  return {
    requestData,
    setRequestData,
    handleRequestInputHandler,
    handleFileChange,
    canSave

  }
}

export default useRequests