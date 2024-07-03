import React, { useState } from 'react'
import { UserAccoountWithRestriction } from '../../../../models/user.model'

const useUserIdentityProps = () => {

    const [page, setPage] = useState(0)

    const userCreationStep = {
        "0": "UserDetail",
        "1": "Permission",
        "2": "Preview",
        // 3: "Complete"    
    }

    const [userData, setUserData] = useState<UserAccoountWithRestriction>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        userId: 0, 
        group: "", 
        home_directory: "",
        account_created_at: "",
        account_modified_at: "", 
        is_staff: true,
        is_active: true, 
        is_superuser:  false
    })

    const canSave = [...Object.values(setUserData)].every(Boolean)

    const disablePrev = page === 0;

    const disableNext =  (page === Object.keys(userCreationStep).length - 1)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(userCreationStep).length - 1 && "remove-button"

    const submitHide = page !== Object.keys(userCreationStep).length - 1 && "remove-button"

    const canSubmit = [...Object.values(userData)].every(Boolean) && page === Object.keys(userCreationStep).length - 1


    const handleUserIdentityCreationInputChanges = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { type, name } = event.target
        const value = type === 'checkbox' ? (event.target as HTMLInputElement).checked  : event.target.value
        setUserData((prev => ({
            ...prev,
            [name]: value
        })))
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
        handleUserIdentityCreationInputChanges
    }
}

export default useUserIdentityProps