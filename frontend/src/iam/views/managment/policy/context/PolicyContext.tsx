import React, { createContext, useContext, useState } from "react";
import { PolicyAPIInterface, PolicyContextPropsInterface, PolicyDataInterface } from "../../../../models/policy.model";

interface ChildrenContext {
    children: React.ReactNode | undefined
}

const PolicyContext = createContext<PolicyContextPropsInterface | undefined>(undefined)

export const PolicyContextProvider = ({children}: ChildrenContext) => {

    const policyCreationStep = {
        0: "Account Detail",
        1: "Assign Group"    
    }  

    const [page, setPage] = useState(0)

    const [policyData, setPolicyData] = useState<PolicyDataInterface>({
        policy_name: '',
        policy_description: '',
        policy_version: '',  // Default version
        is_app_level: false,
        is_model_level: false,
        statements: [
          {
            effect: 'allow',
            action: [],  // Empty array initially, will be updated by checkboxes
            resource: ['X', 'Y']
          }
        ]
    })
    
    const handlePolicyInputFieldChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const { type, name } = event.target
      const value = type === 'checkbox' && event.target instanceof HTMLInputElement ? event.target.checked : event.target.value
        setPolicyData({
            ...policyData,
            [name]: value
        })
    }

    // Handle changes to the statements, especially checkboxes for actions
    const handleCheckboxChange = (action: string) => {
        setPolicyData(prevPolicy => {
          const currentActions = prevPolicy.statements[0].action;
      
          // If the action is already selected, remove it; otherwise, add it
          const updatedActions = currentActions.includes(action)
            ? currentActions.filter(selected => selected !== action) // Remove action if already present
            : [...currentActions, action]; // Add new action
      
          // Return the updated policy with the modified actions array
          return {
            ...prevPolicy,
            statements: [
              {
                ...prevPolicy.statements[0],
                action: updatedActions
              }
            ]
          };
        });
      };


    const canSave = Object.values(policyData).every(value => Boolean(value));

    const disablePrev = page === 0;

    const disableNext =  (page === Object.keys(policyCreationStep).length - 1)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(policyCreationStep).length - 1 && "remove-button"; 

    const submitHide = page !== Object.keys(policyCreationStep).length - 1 && "remove-button";

    const canSubmit = Object.values(policyData).every(value => Boolean(value)) && page === Object.keys(policyCreationStep).length - 1;



    return(
        <PolicyContext.Provider value={{
            policyData,
            page,
            canSave,
            disableNext,
            disablePrev,
            prevHide,
            nextHide,
            submitHide,
            canSubmit,
            policyCreationStep,
            setPage,
            setPolicyData,
            handlePolicyInputFieldChange,
            handleCheckboxChange           
        }}>
            {children}
        </PolicyContext.Provider>
    )
}







export default PolicyContext