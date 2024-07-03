import React from 'react'
import {getCoreRowModel, useReactTable, flexRender} from '@tanstack/react-table'
import { data } from '../../constants/columns'
import { columns, ROLE_COLUMN } from '../../constants/columns'
// import { useTable, usePagination, Row, TableInstance, TableState, Column } from 'react-table'

// interface CustomProps extends TableInstance {
//   page: any;
  
// }

// interface CustomState extends TableState {
//   pageIndex?: number;
//   pageSize?: number;
// }


// interface TableProps {
//   columns: any[];
//   data: any[] ;
//   actions: (hooks: any) => unknown 
// }

// const RoleTableStructure = ({columns, data, actions}: TableProps) => {
  
//     const {
//       getTableProps,
//       getTableBodyProps,
//       headerGroups,
//       page,
//       prepareRow,
//       //state: { globalFilter, selectedRowIds, pageIndex, pageSize },
      
     
//     } =useTable({ 
//         columns, data, 
//         // initialState: {
//         //   pageIndex : 0,
//         //   pageSize : 2
//         // }
//     }, usePagination) as CustomProps;

  
//     return (
     
//         <table className={`table table-sm table-border table-striped text-left mb-5 text-[14px]`} {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row :any) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell: any) => (
//                     <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
      
      
//     );
//   };
  

// export default RoleTableStructure
