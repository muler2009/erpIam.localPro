import React, { createContext, useContext, useState } from "react";
import { PolicyAPIInterface, PolicyContextPropsInterface } from "../../../../models/policy.model";

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

    const [policyData, setPolicyData] = useState<PolicyAPIInterface>({
        policy_name: "",
        policy_verison: 0,
    })

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
            setPolicyData
        }}>
            {children}
        </PolicyContext.Provider>
    )
}







export default PolicyContext