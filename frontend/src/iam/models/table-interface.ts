import { ColumnDef, FilterFn, Row } from "@tanstack/react-table";

export interface BaseRecord {
    datetime?: string | Date; // Make it optional if not all records have this property

  
  }

export interface SharedTableProps<T> extends BaseRecord{
    data: T[];
    columns: ColumnDef<T, any>[];
    watermark?: string;
    showEntries?: boolean;
    showSearch?: boolean;
    showActions?: boolean; 
    showPagination?: boolean;
    showFilter?:boolean;
    showFooter?: boolean;
    filter_btn_name?: string;
    noRecordMessage?: string;
    customRowRenderer?: (row: Row<T>) => React.ReactNode; // Custom row rendering
    additionalFilters?: FilterFn<T>[]; // Additional filtering logic
    filter_title?: string;
    tableStyle?: string;
}

export interface TableFilterProps {
    table: any;
    onMonthChange: (month: string) => void;
    filter_title?: string;
  }

export interface FilterPropsInterface {
    label: string;
}