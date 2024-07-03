import { createColumnHelper } from '@tanstack/react-table';
// import {Column, Row} from 'react-table'
import {AiOutlineTranslation} from 'react-icons/ai'

interface TableData {
    branch_name: string;
    location: string;
    address: string;
}

const columnHelper = createColumnHelper<TableData>()

export const columns = [
    columnHelper.accessor(row => row.branch_name, {id: "Branch Name"}),
    columnHelper.accessor(row => row.location, {
        id: 'Location',
        cell: info => info.getValue(),
        enableSorting: false,
    }),
    columnHelper.accessor(row => row.address, {
        id: 'Address',
        cell: info => {
            const value = info.getValue()
            const value2 = info.row
            
            return(
                <h1 className='text-red-500'>
                    {info.getValue().toUpperCase()}
                </h1>
            
            )
        },
    }),
    columnHelper.accessor(row => row.branch_name, {
        header: "Action",
        cell: (info) => {
            const value = info.row.original
            return(
                <div className='flex space-x-3'>
                    <button className='btn-sm bg-blue-500 text-white px-2' onClick={() => alert(`${value.branch_name}`)}>
                        <AiOutlineTranslation />
                    </button>
                    <button className='btn-sm bg-blue-500'  onClick={() => alert(`${value.location}`)}>OK</button>

                </div>
            )
        },
        enableSorting: false
    }),
]


// export const columns = [
//     { 
//         accessorKey: "branch_name", header: "Name",
//         //cell: (props: any) => <p>{props.getValue}</p>
//     },
//     { accessorKey: "location", header: "Location",
//       //cell: (props: any) => <p>{props.getValue}</p>
//     },
//     { 
//         accessorKey: "address", header: "Address",
//         //cell: (props: any) => <p>{props.getValue}</p>
//     }

// ]

export const ROLE_COLUMN = [
    { 
      accessor: "branch_name", Header: "Name",
        
    },
    { accessor: "location", Header: "Location",
    },
      
    { 
        accessor: "address", Header: "Address",
        
    }

]




export const data1 : TableData[] = [
    { branch_name: 'John Doe', location: 'Addis Ababa', address: 'New York' },
    { branch_name: 'Muler Taye', location: 'Gonder', address: 'New York' },
    { branch_name: 'Yonas Habtie', location: 'Tigray', address: 'New York' },
    // Add more data as needed
  ];

  export const data = [
    { branch_name: 'John Doe', location: '25', address: 'New York' },
    { branch_name: 'John Doe', location: '25', address: 'New York' },
    { branch_name: 'John Doe', location: '25', address: 'New York' },
    // Add more data as needed
  ];

