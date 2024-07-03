import React, { createContext, useContext, ReactNode } from 'react';
import { Table, TableOptions, Column } from '@tanstack/react-table';

interface TableContextType {
  tableInstance: Table<any>;
  data: any[];
  columns: Column<any>[];
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

interface TableProviderProps {
  children: ReactNode;
  tableInstance: Table<any>;
  data: any[];
  columns: Column<any>[];
}

export const TableProvider = ({ children, tableInstance, data, columns }: TableProviderProps) => {
  return (
    <TableContext.Provider value={{ tableInstance, data, columns }}>
      {children}
    </TableContext.Provider>
  );
};