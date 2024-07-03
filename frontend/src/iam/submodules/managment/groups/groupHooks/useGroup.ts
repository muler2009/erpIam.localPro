import React, { useState } from 'react'
import { GroupInterface } from '../../../../models/group.model'
import { useForceUpdate } from 'framer-motion'

const useGroup = () => {

    const [groupData, setGroupData] = useState<GroupInterface>({
        group_name: "",
        group_abbreviation: "",
        has_sub_group: false,
        group_posix_Id: 0,
        members: [],
        group_description: "",
    })

    const { has_sub_group, ...requiredValues } = groupData

    const handleGroupInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       
        const {type, name, value, checked} = event.target
  
        setGroupData((prevData) => ({
          ...prevData,
            [name]:  type === 'checkbox' ? checked : value
        })
        )    
    }

    const canSave = [...Object.values(requiredValues)].every(Boolean)


  return {
    groupData,
    canSave,
    handleGroupInputChange,
  }
}

export default useGroup
