import React, {createContext, useState} from 'react'
import { GroupContextType, GroupCreateChildrenInterface } from '../../../../models/group.model'
import { GroupInterface } from '../../../../models/group.model'

type Option = {
    username: string | number;
  };


const GroupCreateContext = createContext<GroupContextType | undefined>(undefined)

export const GroupCreateContextProvider = ({children}: GroupCreateChildrenInterface) => {
   
    const groupCreationStep: { [key: number]: string }  = {      
        0: "Group Creation",
        1: "Attach Policy",
    } 

    const [page, setPage] = useState(0)

    // a state for handling the group abbreviation 
    const [abbreviateGroup, setAbbreviateGroup] = useState("none")

    const [groupData, setGroupData] = useState<GroupInterface>({
        group_name: "",
        group_abbreviation: "",
        group_posix_Id: 0,
        members: [],
        group_description: "",
    })

    // A method to automatically generate the group_abbreviation 
    // it generate random number between 0 and 999 and convert to string with radix 10
    const gernerate_group_abbreviation = () => {
        const randomGroupNumber = Math.floor((Math.random() * 1000)).toString(10)
        return 'GRP' + randomGroupNumber ;
    }

    const canSave = Object.values(groupData).every(value => Boolean(value));

    const disablePrev = page === 0;

    const disableNext =  (page === Object.keys(groupCreationStep).length - 1)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(groupCreationStep).length - 1 && "remove-button" 

    const submitHide = page !== Object.keys(groupCreationStep).length - 1 && "remove-button"

    const canSubmit = Object.values(groupData).every(value => Boolean(value)) && page === Object.keys(groupCreationStep).length - 1;

    const handleGroupAttributesChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        const { type, name } = event.target
        const value = type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value
        setGroupData(prevGroupState => ({
            ...prevGroupState,
            [name]: value
        }))

    }

    // a function used to automatically generate the user abbreviation
    const handleAutomaticallyTypeChange =  (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const type = event.target.value;
        setAbbreviateGroup(type);
        if (type === 'auto') {
          const generatedGroupAbbrivation = gernerate_group_abbreviation();
          setGroupData(prevGroupState => ({
            ...prevGroupState,
            group_abbreviation: generatedGroupAbbrivation
          }))
      };}
      
      const handleGroupAutoChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const group_abbreviation = event.target.value;
        setGroupData(prevState => ({
            ...prevState,
            group_abbreviation
        }));
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
    
            setGroupData(prevData => ({
                ...prevData,
                members: usernames  // Set members as an array of usernames
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
        setGroupData(prevData => ({
            ...prevData,
            members: usernames  // Set members as an array of usernames
        }));
    };

  // function is a TypeScript type guard. 
  // Type guards are functions that allow you to determine if a value conforms to a specific type. 
  const isOptionArray = (data: any): data is Option[] => {
      return Array.isArray(data) && data.every(item => typeof item.username !== 'undefined');
  }


  return (
    <GroupCreateContext.Provider value={{
        groupData,
        page,
        abbreviateGroup,
        groupCreationStep,
        selectedOption,
        membersOfGroup,
        canSave,
        disableNext,
        disablePrev,
        prevHide,
        nextHide,
        submitHide,
        canSubmit,
        setPage,
        setGroupData,
        handleGroupAttributesChange,
        handleAutomaticallyTypeChange,
        handleGroupAutoChange,
        setAbbreviateGroup,
        setSelectedOption,
        setMembersOfGroup,
        isOptionArray,
        handleSelectionChange,
        handleStoreToMembersClick,
        handleBackButtonClick,
        handleRemoveMember
        

    }}>
        {children}
    </GroupCreateContext.Provider>
   
  )
}

export default GroupCreateContext