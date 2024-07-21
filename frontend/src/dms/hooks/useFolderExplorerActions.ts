import React, { useState } from 'react'
import { FolderDataInterface, UploadedDocumentInterface } from '../models/folder-models';


const useFolderExplorerActions = (folder_data: FolderDataInterface) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]); 
  const [forwardStack, setForwardStack] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); 

  const getCurrentFolder = (): FolderDataInterface => {
    let current = folder_data;
    for (const id of currentPath) {
      const nextFolder = current.subfolder?.find(item => item.folder_name === id) as FolderDataInterface;
      if (nextFolder) {
        current = nextFolder;
      } else {
        break;
      }
    }
    return current;
  };

  const handleItemClick = (item: FolderDataInterface | UploadedDocumentInterface) => {
    if ('subfolder' in item) {
      setCurrentPath([...currentPath, item.folder_name]);
      console.log('handleItemClick - currentPath:', currentPath);
    }
    setSelectedItem('folder_identifier' in item ? item.folder_name : item.uploaded_document_name);
  };

  // const handleBackClick = () => {
  //   if (currentPath.length > 0) {
  //     setCurrentPath(currentPath.slice(0, -1));
  //     setSelectedItem(null);
  //   }
  // };

  const handleBackClick = () => {
    if (currentPath.length > 0) {
      const lastFolder = currentPath[currentPath.length - 1];
      setForwardStack([...forwardStack, lastFolder]);
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };

  const handleForwardClick = () => {
    if (forwardStack.length > 0) {
      const nextPath = forwardStack.pop();
      if (nextPath !== undefined) {
        setCurrentPath([...currentPath, nextPath]);
        setSelectedItem(null);
      }
    }
  };

  const getBreadcrumbs = () => {
    let breadcrumbs = [folder_data];
    let current = folder_data;
    for (const folder_name of currentPath) {
      const nextFolder = current.subfolder?.find(folder => folder.folder_name === folder_name);
      if (nextFolder) {
        breadcrumbs.push(nextFolder);
        current = nextFolder;
      } else {
        break;
      }
    }
    return breadcrumbs;
  };

  

  return {
    currentFolder: getCurrentFolder(),
    handleBackClick,
    handleItemClick,
    handleForwardClick,
    currentPath,
    selectedItem,
    setCurrentPath,
    setSelectedItem,
    getBreadcrumbs
  };
};

export default useFolderExplorerActions;

