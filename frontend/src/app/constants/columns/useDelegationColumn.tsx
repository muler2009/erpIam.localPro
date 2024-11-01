import React, {useMemo} from 'react'
import {format} from 'date-fns'
import { createColumnHelper } from "@tanstack/react-table";
import { DelegationColumnInterface } from '../../models/delegation-models';
import { FlexBox, FlexBoxInner, Text } from '../../../components/common/StyledComponent';
import {AiOutlineCaretDown} from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'
import * as CiIcons from 'react-icons/ci'
import BottomTooltip from '../../../components/common/BottomTooltip';



const delegationColumnHelper = createColumnHelper<DelegationColumnInterface>()

const useDelegationColumn = () => {

    const delegationColumn = useMemo(() => [

        delegationColumnHelper.display({
            id: "No",
            header: () => {
                return(
                   <div>No</div>
                )
            },
            cell: ({row}) => {
                return(
                    <span>{row.index + 1}</span> 
                )
            }
        }),
    
        delegationColumnHelper.display({
            id: "selection",
            // header: ({table}) => {
            //     return(
            //         <input 
            //             type='checkbox'
            //             onChange={table.getToggleAllPageRowsSelectedHandler()}
            //             checked={table.getIsAllRowsSelected()}
            //             className="w-[14px] h-[14px] rounded-none appearance-auto checked:appearance-none checked:bg-blue-500 before:checked:text-white" 
            //         />
            //     )
            // },
            cell: ({row}) => {
                return(
                    <input 
                        type='checkbox'
                        onChange={row.getToggleSelectedHandler()}
                        checked={row.getIsSelected()}
                        className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']"  
                    />
                )
            },
        }),

            delegationColumnHelper.accessor(row => row.delegatee_user, {
                id: "delegatee_user",
                header: () => {
                    return(
                        <FlexBox className="flex justify-between items-center border-r border-l px-2">
                            <Text className='font-normal'>Delegetee</Text>
                            <AiOutlineCaretDown size={10} />
                        </FlexBox>
                    )
                },
                cell: ({ row }) => {
                    return(
                        <FlexBox className='whitespace-nowrap text-[#5e2f05] font-semibold'>
                            {row.original.delegatee_user}
                        </FlexBox>
                    )
                }
            }),
    
            delegationColumnHelper.accessor(row => row.delegation_start_date, {
                id: "delegation_start_date",
                header: () => <Text className='font-noraml'>Delegated Date</Text>,
                cell: ({ row }) => {
                    return(
                        <FlexBox className='whitespace-nowrap'>
                            <p>date</p>
                        </FlexBox>
                    )
                }
            }),
            delegationColumnHelper.accessor(row => row.delegation_end_date, {
                id: "delegation_end_date",
                header: () => {
                    return(
                        <FlexBox className="flex justify-between items-center border-r pr-2">
                            <Text className='font-normal'>Delegation End-date</Text>
                            <AiOutlineCaretDown size={10} />
                        </FlexBox>
                    )
                },
                cell: ({ row }) => {
                    const date = row.original.delegation_end_date || new Date()
                    return(
                        <FlexBox className='whitespace-nowrap'>
                            <p>{format(date, 'EEEE, MM dd yyyy')}</p>
                        </FlexBox>
                    )
                }
            }),
    
            delegationColumnHelper.accessor(row => row.is_delegation_active, {
                id: "is_delegation_active",
                header: () => {
                    return(
                        <FlexBox className="flex justify-between items-center border-r pr-2">
                            <Text className='font-normal'>Status</Text>
                            <AiOutlineCaretDown size={10} />
    
                        </FlexBox>
                    )
                },
                cell: ({ row }) => {
                    return(
                        <FlexBox className='whitespace-nowrap'>
                            <p className='text-[11px] font-semibold text-[#333] text-opacity-50'>
                                { row.original.is_delegation_active ? (<p>Active</p> ) : (<p>Revoked / Expired</p>)}
                              
                            </p>
                        </FlexBox>
                    )
                }
            }),
    
           
    
            delegationColumnHelper.display({
                id: "actions",
                header: () => <span className="flex justify-end pr-10"><BiIcons.BiDotsVerticalRounded /></span>,
                cell: ({row }) => {
                    return(
                        <FlexBox className="flex justify-end items-center pr-20 invisible group-hover:visible">
                            <BottomTooltip content={`Rename`}>
                                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.delegatee_user} Edit Clicked`)}>
                                    <CiIcons.CiEdit size={17} />
                                </FlexBoxInner>
                            </BottomTooltip>
                            <BottomTooltip content={`Delete`}>
                                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.delegation_end_date} Delete Clicked`)}>
                                    <CiIcons.CiTrash size={17} />
                                </FlexBoxInner>
                            </BottomTooltip>
                        </FlexBox>
                    )
                }
            }),
    
       ],
       
       [])

  return{delegationColumn}
}

export default useDelegationColumn