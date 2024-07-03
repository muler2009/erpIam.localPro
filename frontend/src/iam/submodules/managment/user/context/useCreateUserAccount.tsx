import React, { useState } from 'react'
import {UserAccountInterface, ContextType } from '../../../../models/user.model'


const useCreateUserAccount = () => {
      const userCreationStep = {
        "0": "UserDetail",
        "1": "Permission",
        "2": "Preview",
        // 3: "Complete"    
    }

    const [newUserAccount, setUserNewAccount] = useState<UserAccountInterface>({
        username: "",
        email: "",
        accessType: false,
        authentication: false,
        passwordType: "",
        autoPassword: "",
        password: "",
        policy: false,
        group: "",
        gChecked: false
    })

    const [page, setPage] = useState(0)

    // const handleUserCreateInputChanges = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    //   const {type, name, value} = event.target;
    
    //   if (type === 'checkbox') {
    //     const target = event.target as HTMLInputElement;
    //     setUserNewAccount((prevData) => ({
    //       ...prevData,
    //       [name]: target.checked,
    //     }))
     
    //   } else {
    //     const target = event.target as HTMLSelectElement;
    //     setUserNewAccount((prevData) => ({
    //       ...prevData,
    //       [name]: target.value,
    //     }));
    //   }
    // };

    const handleUserCreateInputChanges = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => {
      const {type, name} = event.target;
      const value = type === 'checkbox' ? (event.target as HTMLInputElement).checked  : event.target.value
      setUserNewAccount({
        ...newUserAccount,
        [name]: value
      })
    };

    const canSave = [...Object.values(setUserNewAccount)].every(Boolean)

    const disablePrev = page === 0;

    const disableNext =  (page === Object.keys(userCreationStep).length - 1)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(userCreationStep).length - 1 && "remove-button"

    const submitHide = page !== Object.keys(userCreationStep).length - 1 && "remove-button"

    const canSubmit = [...Object.values(newUserAccount)].every(Boolean) && page === Object.keys(userCreationStep).length - 1

  return {
    newUserAccount,
    setUserNewAccount,
    handleUserCreateInputChanges, 
    canSave,
    page,
    setPage,
    userCreationStep,
    disableNext,
    disablePrev,
    prevHide,
    nextHide,
    submitHide, canSubmit
  }
}

export default useCreateUserAccount
