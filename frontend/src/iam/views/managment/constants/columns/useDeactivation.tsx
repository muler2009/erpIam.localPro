import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { UserAPIResponse, UserCoulumn } from '../../../../models/user.model'
import { format } from 'date-fns'
import * as BiIcons from 'react-icons/bi'
import { useMemo } from 'react'
import { GroupMembersInterface } from '../../../../models/group.model'
import useCommonUtils from '../../../../../hooks/useCommonUtils'
import ActionOnUserComponent from './user-action-modal/ActionOnUserComponent'
import { useModal } from '../../../../components/reusable/custom-modal/context/useModal'
import { FlexBox } from '../../../../../components/common/StyledComponent'

const userDeactivationHelepr = createColumnHelper<UserCoulumn>()

const useDeactivation = () => {

    const userDeactivationColumns = useMemo(
        () => [
           
            userDeactivationHelepr.accessor(row => `${row.userId}`, {
                id: "userId",
                header: () => <span>User ID</span>,
                cell: cellprops => cellprops.getValue(),
                enableSorting: true
            }),
            userDeactivationHelepr.accessor(row => `${row.first_name} ${row.last_name}`, {
                id: "Full name",
                header: () => <span className='white'>Full Name</span>,
            }),
          
            userDeactivationHelepr.display({
                id: "actions",
                header: () => <span className="flex justify-end pr-10">{BiIcons.BiDotsVerticalRounded({})}</span>,
                cell: ({row}) => {
                    const rowData: UserAPIResponse = row.original;
                    return(
                       <FlexBox className='flex space-x-1 justify-center py-2'>
                            <button className='btn-sm bg-green-500 text-white px-4 text-[12px]'>Activate</button>
                            <button className='btn-sm bg-red-500 text-white px-4 text-[12px]'>Deactivate</button>
                       </FlexBox>
                    )
                }
            }),

        ], []
    )

  return { userDeactivationColumns }
}

export default useDeactivation





