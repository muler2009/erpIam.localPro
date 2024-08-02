import React, { useState } from 'react'
import { FolderCreateInterface } from '../models/folder-models'
import { useCreateFolderMutation } from '../services/folderAPISlice'

const useCreareFolder = () => {

    const [folderAttributes, setFolderAttributes] = useState<FolderCreateInterface>({
        folder_name: "",
        parent_folder: ""
    })

    const {parent_folder, ...requiredAttributes} = folderAttributes

    const canSave = [...Object.values(requiredAttributes)].every(Boolean) 

    const handleFolderCreationInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
    
        setFolderAttributes({
            ...folderAttributes,
            [name]: value
        })
    }
    
  return {
    folderAttributes,
    canSave,
    handleFolderCreationInputChanges,
    setFolderAttributes
  }
}

export default useCreareFolder