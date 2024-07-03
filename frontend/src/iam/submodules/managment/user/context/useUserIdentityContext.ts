import React, {useContext} from 'react'
import UserIdentityContext from './UserIdentityContext';

export const useUserIdentityContext = () => {
  const context = useContext(UserIdentityContext);
  if (context === undefined) {
    throw new Error('useCreateUserAccountContext must be used within a CreateUserAccountProvider');
  }
  return context;
};

export default useUserIdentityContext