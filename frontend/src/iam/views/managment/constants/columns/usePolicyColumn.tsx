import React, {useMemo} from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { PolicyColumnInterface } from '../../../../models/policy.model'
import { Div , FlexBox, Text, FlexBoxInner} from '../../../../../components/common/StyledComponent'
import { AiOutlineCaretDown } from 'react-icons/ai'
import BottomTooltip from '../../../../../components/common/BottomTooltip'
import * as BiIcons from 'react-icons/bi'
import * as CiIcons from 'react-icons/ci'



const policyColumnHelper = createColumnHelper<PolicyColumnInterface>()

const usePolicyColumn = () => {
   const policyColumn = useMemo(() => [

    // policyColumnHelper.display({
    //     id: "No",
    //     header: () => {
    //         return(
    //            <div>No</div>
    //         )
    //     },
    //     cell: ({row}) => {
    //         return(
    //             <span>{row.index + 1}</span> 
    //         )
    //     }
    // }),

        policyColumnHelper.display({
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

        policyColumnHelper.accessor(row => row.policy_name, {
            id: "policy_name",
            header: () => {
                return(
                    <FlexBox className="flex justify-between items-center border-r border-l px-2">
                        <Text className='font-normal'>Policy name</Text>
                        {
                            AiOutlineCaretDown({})
                        }
                    </FlexBox>
                )
            },
            cell: ({ row }) => {
                return(
                    <FlexBox className='whitespace-nowrap text-[#5e2f05] font-semibold'>
                        {row.original.policy_name}
                    </FlexBox>
                )
            }
        }),

        policyColumnHelper.accessor(row => row.policy_version, {
            id: "policy_verison",
            header: () => <Text className='font-noraml'>Version</Text>,
            cell: ({ row }) => {
                return(
                    <FlexBox className='whitespace-nowrap'>
                        <p>{row.original.policy_version}</p>
                    </FlexBox>
                )
            }
        }),
        policyColumnHelper.accessor(row => row.policy_version, {
            id: "policy_verison",
            header: () => {
                return(
                    <FlexBox className="flex justify-between items-center border-r pr-2">
                        <Text className='font-normal'>Type</Text>
                            {AiOutlineCaretDown({size: 10})}
                    </FlexBox>
                )
            },
            cell: ({ row }) => {
                return(
                    <FlexBox className='whitespace-nowrap'>
                        <p className='text-[11px] font-semibold text-[#333] text-opacity-50'>Custom Managed by OLB</p>
                    </FlexBox>
                )
            }
        }),

        policyColumnHelper.accessor(row => row.is_app_level, {
            id: "is_app_level",
            header: () => {
                return(
                    <FlexBox className="flex justify-between items-center border-r pr-2">
                        <Text className='font-normal'>level</Text>
                        {AiOutlineCaretDown({size: 10})}
                    </FlexBox>
                )
            },
            cell: ({ row }) => {
                return(
                    <FlexBox className='whitespace-nowrap'>
                        <p className='text-[11px] font-semibold text-[#333] text-opacity-50'>
                            { row.original.is_app_level && (<p>Application level policy</p> )}
                            { row.original.is_model_level && (<p>Model level policy</p> )}

                        </p>
                    </FlexBox>
                )
            }
        }),

        policyColumnHelper.accessor(row => row.policy_description, {
            id: "policy_verison",
            header: () => {
                return(
                    <FlexBox className="flex justify-between items-center border-r pr-2">
                        <Text className='font-normal'>Description</Text>
                        {AiOutlineCaretDown({size: 10})}

                    </FlexBox>
                )
            },
            cell: ({ row }) => {
                return(
                    <FlexBox className='whitespace-nowrap'>
                        <p className='text-[12px]'>{row.original.policy_description}</p>
                    </FlexBox>
                )
            }
        }),

        policyColumnHelper.display({
            id: "actions",
            header: () => <span className="flex justify-end pr-10"><>{BiIcons.BiDotsVerticalRounded({})}</></span>,
            cell: ({row }) => {
                return(
                    <FlexBox className="flex justify-end items-center pr-20 invisible group-hover:visible">
                        <BottomTooltip content={`Rename`}>
                            <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.policy_name} Edit Clicked`)}>
                                {
                                    CiIcons.CiEdit({
                                        size: 17
                                    })
                                }
                            </FlexBoxInner>
                        </BottomTooltip>
                        <BottomTooltip content={`Delete`}>
                            <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.policy_action_name} Delete Clicked`)}>
                                {
                                    CiIcons.CiTrash({
                                        size: 17
                                    })
                                }
                            </FlexBoxInner>
                        </BottomTooltip>
                    </FlexBox>
                )
            }
        }),

   ],
   
   [])
  return {policyColumn}
}

export default usePolicyColumn