import { useState, useCallback } from "react";
import { FlexBox, Div } from "../../../../components/common/StyledComponent";
import { DelegationColumnInterface } from "../../../models/delegation-models";
import RevokeDelegationModal from "./RevokeDelegationModal";
import useUtils from "../../../hooks/useUtils";
import UpdateDelegationModalComponent from "./UpdateDelegationModalComponent";



const delegationAction = [
    { label: "Change Permission", color:'#3971c2', link_identifier: "Change"},
    { label: "Revoke", color: '#f35247', link_identifier: "Revoke"}

]

const DelegationActionComponent = ({rowData}: {rowData: DelegationColumnInterface}) => {

    const [activeModal, setActiveModal] = useState<string | null>(null);
    const {isOpen, handleIsOpenCloseMenu} = useUtils()

    const handleActionClick = (linkIdentifier: string) => {
        setActiveModal(linkIdentifier);
    }; 
  
      return(
        <>
        
            <FlexBox className="flex justify-start items-center space-x-2 pr-20 py-3">
                {
                    delegationAction?.map(action => {
                        return(
                            <Div 
                                key={action.label}
                                className={`text-[12px] border-[2px] border-text-primary px-5 py-1 rounded-[5px] hover:bg-[${action.color}] hover:border-[${action.color}] hover:text-white`}
                                onClick={() => handleIsOpenCloseMenu(action.link_identifier)}
                            >
                                {action.label}
                            </Div>
                        )
                    })
                }
            </FlexBox>
                 
            {
                isOpen["Change"] && (
                <UpdateDelegationModalComponent 
                    handleIsOpenCloseMenu={() => handleIsOpenCloseMenu("Change")}
                    title={`Update`}
                    rowData={rowData}
                    link_identifier={"Change"}
                    
                />
                )
            }

            {isOpen["Revoke"]  && (
               <RevokeDelegationModal 
                    handleIsOpenCloseMenu={() => handleIsOpenCloseMenu("Revoke")}
                    title={`Revode`}
                    rowData={rowData}
                    link_identifier={"Revoke"}
                
            />
            )}
             
                

               
        
        
        </>
      )
  }
  
export default DelegationActionComponent
  