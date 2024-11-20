import React, {useState} from 'react'
import { useSetUpNotificationPreferenceMutation } from '../services/notificationAPISlice'
import { useGetNotificationTemplateQuery } from '../../iam/features/settingAPI'
import { NotificationPreferenceSettingInterface } from '../models/preference.setting'

const useNotificationPreference = () => {

  const [preferenceSetUp, setPreferenceSetUp] = useState<NotificationPreferenceSettingInterface>({
    template: "",
    preffered_channel: "",
    enabled: true
  })

    const handlePreferenceSetUpChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
      const {name, type } = event.target
      const preferenceValues = type === 'checkbox' && event.target instanceof HTMLInputElement ? event.target.checked : event.target.value
      
      setPreferenceSetUp({
        ...preferenceSetUp,
        [name]: preferenceValues
      })
    }

    const {
      enabled,
      ...requireData
    } = preferenceSetUp

  const canSave = Object.values(requireData).every(Boolean)


  return {
        preferenceSetUp,
        handlePreferenceSetUpChange,
        canSave
  }
}

export default useNotificationPreference