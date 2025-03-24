import React,{createContext, useState} from 'react'
import { DelegationContextPropsInterface, DelegationDataInterface } from '../../../models/delegation-models'

interface ChildrenContext {
  children: React.ReactNode | undefined
}

const DelegationContext = createContext<DelegationContextPropsInterface | undefined>(undefined)

export const DelegationContextProvider = ({children}: ChildrenContext) => {

  const delegationStep = { 
    0: "Delegation Information",
    1: "Allowed Permission"    
  }  

  const [page, setPage] = useState(0)

  const [delegationData, setDelegationData] = useState<DelegationDataInterface>({
    delegator: "",
    delegatee_user: "", 
    delegation_start_date: null,
    delegation_end_date: null,
    is_delegation_active: false 
  })

  const handleDelegationInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { type, name } = event.target
    const value = type === 'checkbox' && event.target instanceof HTMLInputElement ? event.target.checked : event.target.value
      setDelegationData({
          ...delegationData,
          [name]: value
      })
  }

  const handleDateInputChange = (date: Date | null, inputDate: keyof DelegationDataInterface) => {
    if (date instanceof Date) {
      const formattedDate = date.toISOString().split('T')[0]
      setDelegationData({
        ...delegationData,
        [inputDate]: formattedDate
      });
    } else {
      
      console.log("Invalid date format");
    }
  };

const canSave = Object.values(delegationData).every(value => Boolean(value));

    const disablePrev = page === 0;

    const disableNext =  (page === Object.keys(delegationStep).length - 1)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(delegationStep).length - 1 && "remove-button"; 

    const submitHide = page !== Object.keys(delegationStep).length - 1 && "remove-button";

    const canSubmit = Object.values(delegationData).every(value => Boolean(value)) && page === Object.keys(delegationStep).length - 1;

  return (
    <DelegationContext.Provider value={{
      delegationData,
      page,
      delegationStep,
      canSubmit,
      disableNext,
      disablePrev,
      prevHide,
      nextHide,
      submitHide,
      setPage,
      setDelegationData,
      handleDelegationInputChange,
      handleDateInputChange
    }}>
      {children}
    </DelegationContext.Provider>
  )
}

export default DelegationContext