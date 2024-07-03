import React, {useState, useContext, createContext} from 'react'
import { GroupAPIResponse, GroupInterface } from '../../models/group.model'
import { useGetGroupsQuery } from '../../features/groupsAPI'
import useUserContext from '../../submodules/managment/user/context/useUserContext'

type TData = {
    data: string
}

interface RowDataType {
  id: number
  custom_group_abbreviation: string,
  custom_group_name: string,
}
interface ChildenType {
  children: React.ReactNode
}
interface SelectedRowContextType {
  selectedRows: RowDataType | null;
  setSelectedRows: React.Dispatch<React.SetStateAction<RowDataType | null>>;
}

const SelectedRowContext = createContext<SelectedRowContextType>({
  selectedRows: null,
  setSelectedRows: () => {},
});

export const useSelectedRowContext = () => useContext(SelectedRowContext);


export const SelectedRowContextProvider = ({ children }: ChildenType) => {
  const [selectedRows, setSelectedRows] = useState<RowDataType | null>(null);

  return (
    <SelectedRowContext.Provider value={{ selectedRows, setSelectedRows }}>
      {children}
    </SelectedRowContext.Provider>
  );
};


const CustomTable = () => {
    const {data} = useGetGroupsQuery()
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const {newUserAccount, setUserNewAccount, handleUserCreateInputChanges} = useUserContext()

     
    const getAttachedGroup = (id: number): string => {
      const selectedRow = data?.find((group, index) => index === id - 1);
      return selectedRow?.group_abbreviation || '';
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
      setSelectedRows([id]);
      setUserNewAccount?.((prevUserAccount) => ({
        ...prevUserAccount,
        group: getAttachedGroup(id),
      }));
    };
  
  
    return (
        <>
          <div className='border py-2 my-2'>
            <p> User Attached to group:  {newUserAccount?.group}</p>
          </div>
          <div className='group'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th className='whitespace-nowrap'>Group Select</th>
                  <th>Group Abbreviation</th>
                  <th>Group Name</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((group, index: number) => {
                    const rowId = index + 1; // Adjust the row identifier based on your data structure
                    const isChecked = selectedRows.includes(rowId);
                    return (
                      <tr key={index}>
                        <td className='flex justify-center items-center'>
                          <input
                            type='radio'
                            name='gChecked'
                            checked={isChecked || newUserAccount?.gChecked}
                            onChange={(event) => handleRadioChange(event, rowId)}
                          />
                        </td>
                        <td>{group.group_abbreviation}</td>
                        <td>{group.group_name}</td>
                        {/* <td>{group.group_created_at}</td> */}
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </>
      );
}


export default CustomTable
