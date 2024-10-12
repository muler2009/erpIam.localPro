import React, { createContext, useContext, useState } from "react";
import { IdentityContextType, UserAccountInterfacee } from "../../../../models/user.model";


interface ChildrenContext {
    children: React.ReactNode | undefined
}

// IdentityContextType a type of the context contain things that it pass 
const UserAccountContext = createContext<IdentityContextType | undefined>(undefined)

export const UserAccountContextProvider = ({ children }: ChildrenContext) => {

    const userCreationStep = {
        0: "Account Detail",
        1: "Assign Group"    
    }     
    const [page, setPage] = useState(0)

    const [usernameType, setUsernameType] = useState("none")
    const [passwordType, setPasswordType] = useState("none")

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
        is_superuser: false,
        password: ""
      
    })

    // const canSave = [...Object.values(setUserData)].every(Boolean)
    const canSave = Object.values(userData).every(value => Boolean(value));

    const disablePrev = page === 0;

    const disableNext =  (page === Object.keys(userCreationStep).length - 1)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(userCreationStep).length - 1 && "remove-button" 

    const submitHide = page !== Object.keys(userCreationStep).length - 1 && "remove-button"

    const canSubmit = Object.values(userData).every(value => Boolean(value)) && page === Object.keys(userCreationStep).length - 1;

    const handleUserIdentityCreationInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { type, name, checked } = event.target
        const value = type === 'checkbox' ? event.target.checked  : event.target.value
        setUserData({
            ...userData,
            [name]: value
        })
    } 

    const generateUsername = () => {
        // Implement your username generation logic here
        return 'user_' + Math.floor( Math.random() * 10000).toString(10);
      };
    
      const handleUsernameTypeChange =  (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const type = event.target.value;
        setUsernameType(type);
        if (type === 'auto') {
          const generatedUsername = generateUsername();
          setUserData(prevData => ({
            ...prevData,
            username: generatedUsername
          }));
        } else if (type === 'manual') {
          setUserData(prevData => ({
            ...prevData,
            username: ''
          }));
        }
      };
      
      const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const username = event.target.value;
        setUserData(prevData => ({
          ...prevData,
          username
        }));
      };
    
      const handlePasswordTypeChange =  (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const type = event.target.value;
        setPasswordType(type);
        if ((type === 'auto') || (type === 'manual')) {
          // const generatedUsername = generateUsername();
          setUserData(prevData => ({
            ...prevData,
            password: ""
          }));
        }
      };
        
        const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
          const password = event.target.value;
          setUserData(prevData => ({
            ...prevData,
            password
          }));
        };

    return(
        <UserAccountContext.Provider value={{
            userData,
            usernameType,
            passwordType,
            setUserData,
            setUsernameType,
            setPasswordType,
            handleUserIdentityCreationInputChanges,
            handleUsernameTypeChange,
            handlePasswordTypeChange,
            handleUsernameChange,
            handlePasswordChange,
            canSave,
            page,
            setPage,
            userCreationStep,
            disableNext,
            disablePrev,
            prevHide,
            nextHide,
            submitHide,
            canSubmit,
            
        }}>
            {children}
        </UserAccountContext.Provider>
    )
}

export default UserAccountContext