import React, {useState, createContext} from "react";
import { RoleContextInterface, RoleDataModelInterface } from "../../../../models/role.models";

interface ChildrenContext {
    children: React.ReactNode | undefined
}

type Option = {
    username: string | number;
  };

const RoleContext = createContext<RoleContextInterface | undefined>(undefined)

export const RoleContextProvider = ({children}: ChildrenContext) => {

    const roleCreationStep = {
        0: "Role Basic Information",
        1: "Assign User"    
    }    

    const [page, setPage] = useState(0)

    const [roleData, setRoleData] = useState<RoleDataModelInterface>({
        role_name: "",
        role_description: "",
        role_status: "",
        role_scope: "",
        users: [],
        role_created_at: "",
        role_modified_date: ""
    })

    const canSave = Object.values(roleData).every(value => Boolean(value));

    const disablePrev = page === 0;

    const disableNext =  (page === Object.keys(roleCreationStep).length - 1)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(roleCreationStep).length - 1 && "remove-button" 

    const submitHide = page !== Object.keys(roleCreationStep).length - 1 && "remove-button"

    const canSubmit = Object.values(roleData).every(value => Boolean(value)) && page === Object.keys(roleCreationStep).length - 1;

    const handleRoleDataCreationInputChanges = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>  | React.ChangeEvent<HTMLSelectElement>) => {
        const { type, name } = event.target
        let value: string | boolean;
        if (type === 'checkbox') { 
            // The event target is narrowed to an HTMLInputElement here
            value = (event.target as HTMLInputElement).checked;
        } else { value = event.target.value; }

        setRoleData({
            ...roleData,
            [name]: value
        })
    } 

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        const { name, value } = event.target;
        setRoleData({
          ...roleData,
          [name]: value,
        });
      };


    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
      // A state that store the selected user to members 
    const [membersOfGroup, setMembersOfGroup] = useState<Option[]>([]);

    const handleSelectionChange = (option: Option) => {
        setSelectedOption(option);
    };
    

    const handleBackButtonClick = () => {
        if (membersOfGroup.length > 0) {
        const optionToRestore = membersOfGroup[membersOfGroup.length - 1];
        setMembersOfGroup(membersOfGroup.slice(0, -1));
        setSelectedOption(optionToRestore);
        }
    };

    const handleStoreToMembersClick = () => {
        if (selectedOption && !membersOfGroup.some(option => option.username === selectedOption.username)) {
            const updatedMembers = [...membersOfGroup, selectedOption];
            setMembersOfGroup(updatedMembers);
    
            const usernames = updatedMembers.map(member => member.username);  // Extract usernames
    
            setRoleData(prevData => ({
                ...prevData,
                users: usernames  // Set members as an array of usernames
            }));
        }
    };
  
    const handleRemoveMember = (memberToRemove: Option) => {
        // Filter out the member to remove
        const updatedMembers = membersOfGroup.filter(member => member.username !== memberToRemove.username);
        // Update the membersOfGroup state
        setMembersOfGroup(updatedMembers);   
        // Extract usernames and update the groupData state
        const usernames = updatedMembers.map(member => member.username);
        setRoleData(prevData => ({
            ...prevData,
            members: usernames  // Set members as an array of usernames
        }));
    };

  // function is a TypeScript type guard. 
  // Type guards are functions that allow you to determine if a value conforms to a specific type. 
  const isOptionArray = (data: any): data is Option[] => {
      return Array.isArray(data) && data.every(item => typeof item.username !== 'undefined');
  }

    return(
        <RoleContext.Provider value={{
            roleData,
            page,
            membersOfGroup,
            setPage,
            setRoleData,
            setSelectedOption,
            handleRoleDataCreationInputChanges,
            handleInputChange,
            handleBackButtonClick,
            handleRemoveMember,
            handleSelectionChange,
            handleStoreToMembersClick,
            isOptionArray,
            setMembersOfGroup,
            canSave,
            canSubmit,
            disableNext,
            disablePrev,
            prevHide,
            nextHide,
            submitHide,
            roleCreationStep
        }}>
            {children}

        </RoleContext.Provider>
    )

}

export default RoleContext