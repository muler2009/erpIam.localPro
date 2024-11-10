import React, { useState } from 'react'
import { NotificationTemplateInterface } from '../models/setting.models'

const useSetting = () => {
    const [notificatonTemplate, setNotificationTemplate] = useState<NotificationTemplateInterface>({
        template_name: "",
        template_channel: "",
        subject: "",
        notification_message: ""
    })
    
    const handleNotificationInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setNotificationTemplate({
            ...notificatonTemplate,
            [name] : value
        })
    }

    const canSave = [...Object.values(notificatonTemplate)].every(Boolean)


  return {
    notificatonTemplate,
    canSave,
    setNotificationTemplate,
    handleNotificationInputChange

  }
}

export default useSetting