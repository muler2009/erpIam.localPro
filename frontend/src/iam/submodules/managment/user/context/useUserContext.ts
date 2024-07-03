import React, {useContext} from 'react'
import CreateUserAccountContext from './CreateUserAccountContext'

// const useUserContext = () => {
//   return useContext(CreateUserAccountContext)
// }

// export default useUserContext


export const useUserContext = () => {
  const context = useContext(CreateUserAccountContext);
  if (context === undefined) {
    throw new Error('useCreateUserAccountContext must be used within a CreateUserAccountProvider');
  }
  return context;
};

export default useUserContext