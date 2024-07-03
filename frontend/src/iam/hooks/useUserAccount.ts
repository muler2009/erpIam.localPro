import React, { useState } from "react"
import { UserAccountDataInterface } from "../models/user.model"

const useUserAccount = () => {
  const [userAccount, setUserAccount] = useState<UserAccountDataInterface>({
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    username: "",
    password: "",
    userType: "",
    isActive: false,
    isStaff: false
  })

  const handleCreateAccInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { name, type, checked, value} = event.target;

    setUserAccount((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
     }));
  
  }

  const { isActive, isStaff, userType, ...requiredValues } = userAccount
  const canSave = [...Object.values(requiredValues)].every(Boolean)

  return {
    userAccount,
    canSave,
    setUserAccount,
    handleCreateAccInputChange
  }
}

export default useUserAccount
