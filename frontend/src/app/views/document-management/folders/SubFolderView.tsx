import React from 'react'
import { FolderDataInterface } from '../../../models/folder-models';
import { ColumnDef } from '@tanstack/react-table';
import NestedFolderTable from '../../../components/tables/NestedFolderTable';
import useSubFolderColumns from '../../../constants/columns/useSubFolderColumns';

interface SubFolderRowDetailedViewProps {
    subfolder: FolderDataInterface[] | undefined;
    columns: ColumnDef<FolderDataInterface, any>[];

  }

const SubFolderView = ({subfolder, columns}: SubFolderRowDetailedViewProps) => {
  const { subFolderColumns } = useSubFolderColumns()
  return (
    <NestedFolderTable data={subfolder || []} columns={subFolderColumns} />
  )
}

export default SubFolderView
  // {
  //   subfolder.map((folder) => (
  //     <div key={folder.folder_identifier} className="subfolder-item">
  //     <div className="folder-info">
  //       {columns.map((column) => (
  //         <div key={column.accessor} className="folder-column">
  //           {column.cell({ getValue: () => folder[column.accessor] })}
  //         </div>
  //       ))}
  //     </div>
  //   ))
  // }