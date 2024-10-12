import React, { useState } from 'react'
import { GroupInterface } from '../../../../models/group.model'
import { useForceUpdate } from 'framer-motion'

const useGroup = () => {

    const [groupData, setGroupData] = useState<GroupInterface>({
        group_name: "",
        group_abbreviation: "",
        group_posix_Id: 0,
        group_description: "",
        members: [],
    })

    // A method to automatically generate the group_abbreviation 
    // it generate random number between 0 and 999 and convert to string with radix 10
    const gernerate_group_abbreviation = () => {
      const randomGroupNumber = Math.floor((Math.random() * 1000)).toString(10)
      return 'GRP' + randomGroupNumber ;
    }


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
    gernerate_group_abbreviation
  }
}

export default useGroup
