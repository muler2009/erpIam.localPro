import React from 'react'

interface FolderProps {
    folder_data: any;
    handleItemClick: (folder: any) => void;
    openStates: boolean[];
    toggleItem: (index: number) => void;
    handleForwardClick: () => void;
    handleBackClick: () => void;
    
  }

const FolderStrucute = ({ folder_data, handleItemClick, openStates, toggleItem, handleBackClick, handleForwardClick }: FolderProps) => {
  return (
    <div>FolderStrucute</div>
  )
}

export default FolderStrucute