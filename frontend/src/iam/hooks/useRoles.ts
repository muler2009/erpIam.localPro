import React, { useState } from 'react'
import { RoleInterface } from '../models/role.models'


const useRoles = () => {
  const [roleState, setRoleState] = useState<RoleInterface>({
    role_name: "",
  })

  const handleRoleCreationInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { type, checked, value, name} = event.target
    const roleValue = type === 'checkbox'? checked : value
    setRoleState(prevRoles => ({
      ...prevRoles,
      [name]: roleValue
    }))
  }

  const clearInputs = () => {
    setRoleState({
      role_name: ""
  })
  }

  return {
    roleState,
    setRoleState,
    clearInputs,
    handleRoleCreationInputChange,

  }
}

export default useRoles
