import React, {createContext} from 'react'
import { IdentityContextType } from '../../../../models/user.model';
import useUserIdentityContext from './useUserIdentityContext';


type ChildrenType =  {
    children?: React.ReactNode | undefined
}

export const UserIdentityContext = createContext<Partial<IdentityContextType>>({});

export const UserIdentityContextProvider = ({ children }: ChildrenType)  => {
    const userAccount = useUserIdentityContext()
  
    return (
      <UserIdentityContext.Provider value={userAccount as IdentityContextType}>
        {children}
      </UserIdentityContext.Provider>
    );
  };






export default UserIdentityContext