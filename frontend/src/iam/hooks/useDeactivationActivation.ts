import React, {useState} from 'react'
import { useGetAllUsersQuery } from '../features/userAPI';
import { useToggelActivationAndDeactivationMutation } from '../features/userAPI';
import useCommonUtils from '../../hooks/useCommonUtils';

const useDeactivationActivation = () => {
    const {handleIsOpenCloseMenuModal} = useCommonUtils()
    const {data: userData, isSuccess, isError, error} = useGetAllUsersQuery()
    const [isSearching, setIsSearching] = useState(false);
    const [search, setSearch] = useState('');

    const handleSearchUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
        setIsSearching(value.length > 0); // Only search when there's input
    };

  

  return {
    userData, 
    search,
    isSearching,
    handleSearchUserChange,
  }
}

export default useDeactivationActivation