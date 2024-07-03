
import {ColumnFiltersState} from '@tanstack/react-table'
import FilterBy from '../common/FilterBy';

export interface SearchProps {
    value?: string | number;
    onChange?: (value: string | number) => void;
    debounce?: number;
    globalFilter: string | number; // Update the type here to match the expected type
    setGlobalFilter: React.Dispatch<React.SetStateAction<string | number>> // Update the type here to match the expected type
}

export type FilterType = string | number

export interface FilterPropDef {
    columnFilters : ColumnFiltersState, 
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
}