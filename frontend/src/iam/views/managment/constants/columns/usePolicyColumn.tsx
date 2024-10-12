import React, {useMemo} from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { PolicyColumnInterface } from '../../../../models/policy.model'
import { FlexBox, Text } from '../../../../components/reusable/StyledComponent'
import { Div } from '../../../../../components/common/StyledComponent'
import { AiOutlineCaretDown } from 'react-icons/ai'



const policyColumnHelper = createColumnHelper<PolicyColumnInterface>()

const usePolicyColumn = () => {
   const policyColumn = useMemo(() => [

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
                        className="w-[14px] h-[14px] rounded-none appearance-auto checked:appearance-none checked:bg-blue-500 before:checked:text-white"  
                    />
                )
            },
        }),

        policyColumnHelper.accessor(row => row.policy_name, {
            id: "policy_name",
            header: () => {
                return(
                    <FlexBox className="flex justify-between items-center">
                        <Text className='font-semibold'>Policy name</Text>
                        <AiOutlineCaretDown />

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

        policyColumnHelper.accessor(row => row.policy_verison, {
            id: "policy_verison",
            header: () => <div>Type</div>,
            cell: ({ row }) => {
                return(
                    <FlexBox className='whitespace-nowrap'>
                        <p>OLBIAM custom managed</p>
                    </FlexBox>
                )
            }
        }),

        policyColumnHelper.accessor(row => row.policy_verison, {
            id: "policy_verison",
            header: () => <div>Description</div>,
            cell: ({ row }) => {
                return(
                    <FlexBox className='whitespace-nowrap'>
                        <p className='text-[12px]'>Provide full access to Document services and resource in the model</p>
                    </FlexBox>
                )
            }
        })

   ], [])
  return {policyColumn}
}

export default usePolicyColumn