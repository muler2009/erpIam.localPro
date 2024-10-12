import React, {useContext} from 'react'
import GroupCreateContext from './GroupCreateContext'

const useGroupContext = () => {
  
    const groupContext = useContext(GroupCreateContext)
    if (groupContext === undefined) {
        throw new Error('useCreateUserAccountContext must be used within a CreateUserAccountProvider');
      }
      return groupContext;

}

export default useGroupContext