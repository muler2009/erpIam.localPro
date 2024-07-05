import React, { useState } from 'react'
import { UserAccountInterfacee } from '../../../../models/user.model'

const useAccountProps = () => {
    const userCreationStep = {
        0: "Account Detail",
        1: "Assign Group"    
    }     
    const [page, setPage] = useState(0)

    const [userData, setUserData] = useState<UserAccountInterfacee>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        userId: 0, 
        group: "", 
        home_directory: "",
        account_created_at: "",
        account_modified_at: "", 
        is_staff: false,
        is_active: true, 
        is_superuser: false
    })

    // const canSave = [...Object.values(setUserData)].every(Boolean)
    const canSave = Object.values(userData).every(value => Boolean(value));

    const disablePrev = page === 0;

    const disableNext =  (page === Object.keys(userCreationStep).length - 1)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(userCreationStep).length - 1 && "remove-button" 

    const submitHide = page !== Object.keys(userCreationStep).length - 1 && "remove-button"

    const handlePrev = () => setPage(prev => prev - 1)
   
    const handleNext = () => setPage(prev => prev + 1)

    // const canSubmit = [...Object.values(userData)].every(Boolean) && page === Object.keys(userCreationStep).length - 1
    const canSubmit = Object.values(userData).every(value => Boolean(value)) && page === Object.keys(userCreationStep).length - 1;

    const handleUserIdentityCreationInputChanges = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { type, name } = event.target
        const value = type === 'checkbox' ? (event.target as HTMLInputElement).checked  : event.target.value
        setUserData({
            ...userData,
            [name]: value
        })
    }
 
    return{
        userData,
        page,
        setPage,
        canSave,
        canSubmit,
        disableNext,
        disablePrev,
        prevHide,
        nextHide,
        submitHide,
        setUserData,
        userCreationStep,
        handlePrev,
        handleNext,
        handleUserIdentityCreationInputChanges
    }
}

export default useAccountProps