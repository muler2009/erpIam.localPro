import React, {useState, useContext, createContext} from 'react'
import { GroupAPIResponse, GroupInterface } from '../../models/group.model'
import { useGetGroupsQuery } from '../../features/groupsAPI'
import { useUserAccountContext } from '../../views/managment/user/context/useUserAccountContext'
import { v4 as isUUID } from 'uuid'; 
import { FlexBox } from '../reusable/StyledComponent';

type TData = {
    data: string
}

interface RowDataType {
  group_id: string;
  group_abbreviation: string;
  group_name: string;
}

interface ChildrenType {
  children: React.ReactNode;
}

interface SelectedRowContextType {
  selectedGroupId: RowDataType | null;
  setSelectedGroupId: React.Dispatch<React.SetStateAction<RowDataType | null>>;
}

const SelectedRowContext = createContext<SelectedRowContextType>({
  selectedGroupId: null,
  setSelectedGroupId: () => {},
});


export const useSelectedRowContext = () => useContext(SelectedRowContext);

export const SelectedRowContextProvider = ({ children }: ChildrenType) => {
  const [selectedGroupId, setSelectedGroupId] = useState<RowDataType | null>(null);

  return (
    <SelectedRowContext.Provider value={{ selectedGroupId, setSelectedGroupId }}>
      {children}
    </SelectedRowContext.Provider>
  );
};

const isValidUUID = (value: string | number): boolean => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return typeof value === 'string' && uuidPattern.test(value);
};

const mapGroupToRowData = (group: GroupInterface): RowDataType => {
  if (!group.group_id || !isValidUUID(group.group_id.toString())) {
    throw new Error("Invalid group_id");
  }
  return {
    group_id: group.group_id.toString(),
    group_abbreviation: group.group_abbreviation,
    group_name: group.group_name,
  };
};





// const CustomTable = () => {
  
//     const { data } = useGetGroupsQuery();
//     const [selectedGroupId, setSelectedGroupId] = useState<string | number | null>(null);
//     const { userData, setUserData, handleUserIdentityCreationInputChanges } = useUserAccountContext();

//     const getAttachedGroup = (group_id: string | number): string => {
//       const selectedRow = data?.find((group) => group.group_id === group_id);
//       return selectedRow?.group_name || '';
//     };

//     const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, group: RowDataType) => {
//       if (group.group_id) {
//         setSelectedGroupId(group.group_id);  // Set the selected group ID
//         setUserData((prevUserAccount) => ({
//           ...prevUserAccount,
//           group: group.custom_group_name,  // Use the group name directly from the RowDataType
//           group_id: group.group_id,  // Include the group_id in the updated user data
//         }));
//       } else {
//         console.error('Invalid group_id:', group.group_id);
//       }
//     };
  
  
//     return (
//         <>
//           <div className='nested-group h-[200px] overflow-y-scroll relative'>
//             <table className='table table-striped'>
//               <thead className='sticky top-0 z-10'>
//                 <tr>
//                   <th className='whitespace-nowrap'>Group Select</th>
//                   <th>Group Name</th>
//                   <th>Group Abbreviation</th>
//                   <th>Description</th>
          
//                 </tr>
//               </thead>
//               <tbody>
//         {data?.map((group) => (
//           <tr key={group.group_id}>
//             <td>
//               <input
//                 type="radio"
//                 name="group"
//                 value={group.group_id}
//                 checked={selectedGroupId === group.group_id}
//                 onChange={(e) => handleRadioChange(e, group)}
//               />
//             </td>
//             <td>{group.group_name}</td>
//             <td>{group.group_abbreviation}</td>
//           </tr>
//         ))}
//       </tbody>
//             </table>
//           </div>
//         </>
//       );
// }


const CustomTable = () => {
  const { data } = useGetGroupsQuery();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const { setUserData } = useUserAccountContext();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, group: RowDataType) => {
    if (group.group_id && isValidUUID(group.group_id)) {
      setSelectedGroupId(group.group_id);
      setUserData((prevUserAccount) => ({
        ...prevUserAccount,
        group: group.group_id, // Assigning group_id to group field
      }));
    } else {
      console.error('Invalid group_id:', group.group_id);
    }
  };

  return (
    <FlexBox className='nested-group h-[200px] overflow-y-scroll relative'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Select</th>
            <th>Group Name</th>
            <th>Group Abbreviation</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((group: GroupInterface) => {
            try {
              const rowData = mapGroupToRowData(group);
              return (
                <tr key={rowData.group_id}>
                  <td>
                    <input
                      type="radio"
                      name="group"
                      value={rowData.group_id}
                      checked={selectedGroupId === rowData.group_id}
                      onChange={(e) => handleRadioChange(e, rowData)}
                    />
                  </td>
                  <td>{rowData.group_name}</td>
                  <td>{rowData.group_abbreviation}</td>
                </tr>
              );
            } catch (error) {
              console.error(error);
              return null;
            }
          })}
        </tbody>
      </table>

    </FlexBox>
  );
};



export default CustomTable


// const getAttachedGroup = (group_id: number): string => {
//   const selectedRow = data?.find((group, index) => index === group_id - 1);
//   return selectedRow?.group_name || '';
// };

// const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
//   setSelectedRows([id]);
//   setUserData?.((prevUserAccount) => ({
//     ...prevUserAccount,
//     group: getAttachedGroup(id),
//   }));
// };