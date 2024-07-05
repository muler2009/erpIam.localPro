import React, { createContext, useContext } from "react";
import { IdentityContextType } from "../../../../models/user.model";
import useAccountProps from "./useAccountProps";

interface ChildrenContext {
    children: React.ReactNode | undefined
}

// IdentityContextType a type of the context contain things that it pass 
const UserAccountContext = createContext<Partial<IdentityContextType>>({})

export const useUserAccount = () => {
    const context = useContext(UserAccountContext);
    if (context === undefined) {
      throw new Error('useCreateUserAccountContext must be used within a CreateUserAccountProvider');
    }
    return context;
  };

export const UserAccountContextProvider = ({ children }: ChildrenContext) => {
    const userAccount  = useAccountProps()
    return(
        <UserAccountContext.Provider value={userAccount as IdentityContextType}>
            {children}
        </UserAccountContext.Provider>
    )
}

export default UserAccountContext