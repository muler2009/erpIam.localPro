import React, { useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { NotificationPreferenceSettingAPI } from '../../models/preference.setting'

const notificationPreferenceSettingHelper = createColumnHelper<NotificationPreferenceSettingAPI>()

const useNotificationPreferenceSetting = () => {
    const notificationPreferenceSettingColumn = useMemo(() => [
        notificationPreferenceSettingHelper.accessor(row => row.template, {
            id: "template",
            header: () => <span>Notification Event</span>,
            cell: ({row}) => {
                return(
                    <div>{row.original.template}</div>
                )
            }
        }),
        notificationPreferenceSettingHelper.accessor(row => row.preffered_channel, {
            id: "preffered_channel",
            header: () => <span>Preferred Channel</span>,
            cell: ({row}) => {
                return(
                    <div>{row.original.preffered_channel}</div>
                )
            }
        }),
        notificationPreferenceSettingHelper.accessor(row => row.enabled, {
            id: "enabled",
            header: () => <span>Enabled</span>,
            cell: ({row}) => {
                const prefenceEnabled = row.original
                return(
                    <div>{
                       prefenceEnabled 
                       ? (
                           <input 
                               type='checkbox'
                               checked={!!prefenceEnabled}  
                               className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-400 checked:border checked:border-green-400 before:checked:text-[12px] before:checked:text-white before:checked:content-['']" 
                               readOnly
                           />

                       ) : <p>Deactivated</p>
                    }</div>
                )
            }
        }),

    ], [])


  return {notificationPreferenceSettingColumn }
}

export default useNotificationPreferenceSetting