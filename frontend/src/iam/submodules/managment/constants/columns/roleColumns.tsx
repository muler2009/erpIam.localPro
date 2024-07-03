import { createColumnHelper, CellContext } from '@tanstack/react-table';
import {AiOutlineTranslation} from 'react-icons/ai'
import { RoleInterface } from '../../../../models/role.models';
import * as CiIcons from "react-icons/ci";
import * as BsIcons from 'react-icons/bs'
import { useState } from 'react';
import CreateRoles from '../../modals/CreateRoles';

 
const columnHelper = createColumnHelper<RoleInterface>()

interface ActionCellProps {
    info: CellContext<RoleInterface, string | undefined>;
  }
  
  const ActionCell: React.FC<ActionCellProps> = ({ info }) => {
    const value = info.row.original;
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
        <div className='flex space-x-1 mx-5'>
          <button className='btn-sm text-black hover:text-blue-800 px-2' onClick={() => setIsOpen(prev => !prev)}>
            <CiIcons.CiEdit size={20} />
          </button>
          <button className='btn-sm text-black hover:text-red-500 px-2' onClick={() => alert(`${value.role_name}`)}>
            <BsIcons.BsTrash size={18} />
          </button>
        </div>
        <CreateRoles isOpen={isOpen} setIsOpen={setIsOpen} title="Edit columns" />
      </>
    );
  };

export const ROLE_COLUMNS = [
    columnHelper.accessor(row => row.role_name, {
        id: "Role Name",
        cell: row => (
            <p className='text-black text-opacity-60'>{row.getValue()}</p>
        )
    }),
    columnHelper.accessor(row => row.role_created_at, {
        id: 'Date Created',
        cell: info => info.getValue(),
        enableSorting: false,
    }),
    columnHelper.accessor(row => row.role_modified_at, {
        id: 'Date Modified',
        cell: info => {
            const value = info.getValue()
            const value2 = info.row
            
            return(
                <h1 className='text-red-500'>
                    {info.getValue()?.toLocaleLowerCase()}
                </h1>
            
            )
        },
    }),
    columnHelper.accessor(row => row.action, {
        header: "Action",
        cell: (info: CellContext<RoleInterface, string | undefined>) => <ActionCell info={info} />,
        enableSorting: false
    }),
]

