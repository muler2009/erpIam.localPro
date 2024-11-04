import React, {useMemo, useCallback, useState} from 'react'
import {format} from 'date-fns'
import { createColumnHelper } from "@tanstack/react-table";
import { DelegationColumnInterface } from '../../models/delegation-models';
import { FlexBox, FlexBoxInner, Text, P, Div } from '../../../components/common/StyledComponent';
import {AiOutlineCaretDown} from 'react-icons/ai'
import DelegationActionComponent from './delegation-column-component/DelegationActionComponent';


const delegationColumnHelper = createColumnHelper<DelegationColumnInterface>()

const useDelegationColumn = (data: any) => {

     // Check if any active delegations are present in the data
    const hasActiveDelegations = useMemo(() => 
        data?.some((row: any) => row.is_delegation_active), 
    [data]);

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
                const startDate = row.original.delegation_start_date || new Date()
                return(
                    <FlexBox className='whitespace-nowrap'>
                            <p>{format(startDate, "EEEE, dd MMMM yyyy")}</p>
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
                const endDate = row.original.delegation_end_date || new Date()
                return(
                    <FlexBox className='whitespace-nowrap py-2'>
                        <p>{format(endDate, "EEEE, dd MMMM yyyy")}</p>
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
                    <FlexBox className=''>
                        { 
                            row.original.is_delegation_active 
                            ? (
                                <P className='font-normal text-primary-green text-[14px]'>
                                    active <span className='text-[11px] block bg-green-100 text-pretty w-[77px] px-2'>{row.original.delegation_duration} days left</span>
                                </P> 
                            ) 
                            : (<P className='text-red-600 text-[13px] font-semibold'>Revoked or Expired</P>)
                        } 
                    </FlexBox>
                )
            }
        }),
        delegationColumnHelper.display({
            id: "actions",
            header: () => hasActiveDelegations ? <span className="flex justify-start pr-10">Actions</span> : null,
            cell: ({row }) => {
                const rowData = row.original
                return(
                    <>
                        {
                            row.original.is_delegation_active && (
                                <DelegationActionComponent 
                                    rowData={rowData}
                                />
                            )
                        }
                    </>
                )
            }
        }),
    
       ],
       
    [])

  return{delegationColumn}
}











export default useDelegationColumn