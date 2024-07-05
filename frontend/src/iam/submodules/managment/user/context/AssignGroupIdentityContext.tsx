import { createContext, useContext, useState } from 'react'
import { GroupInterface } from '../../../../models/group.model';

// structure for the row of the selected table
export interface RowDataType extends GroupInterface {
    id?: number
    group_name: string,
    group_abbreviation: string,
}

// Defining the structure of childern
export interface AssignGroupToIdentityChildren {
    children : React.ReactNode
}

// Defining the structure of Selected row
interface SelectedRowContextType {
    selectedRows: RowDataType | null;
    setSelectedRows: React.Dispatch<React.SetStateAction<RowDataType | null>>;
  }

// export const useSelectedRowContext = () => useContext(SelectedRowContext);

export const AssignGroupToIdentityContext = createContext<Partial<SelectedRowContextType>>({
    selectedRows: null,
    setSelectedRows: () => {},
})

export const AssignGroupToIdentityContextProvider = ({children}: AssignGroupToIdentityChildren) => {

    const [selectedRows, setSelectedRows] = useState<RowDataType | null>(null);
    return(
    <AssignGroupToIdentityContext.Provider value={{ selectedRows, setSelectedRows }}>
        {children}
    </AssignGroupToIdentityContext.Provider>

    )
}


export default AssignGroupToIdentityContext