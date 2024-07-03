import React, {createContext} from 'react'
import useCreateUserAccount from './useCreateUserAccount'
import { ContextType } from '../../../../models/user.model';


type ChildrenType = {
    children?: React.ReactNode | undefined
}

export const CreateUserAccountContext = createContext<Partial<ContextType>>({});

export const CreateUserAccountContextProvider = ({ children }: ChildrenType)  => {
    const userAccount = useCreateUserAccount()
  
    return (
      <CreateUserAccountContext.Provider value={userAccount as ContextType}>
        {children}
      </CreateUserAccountContext.Provider>
    );
  };

export default CreateUserAccountContext
