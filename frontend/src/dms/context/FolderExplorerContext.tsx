import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FolderDataInterface, UploadedDocumentInterface } from '../models/folder-models';

interface FolderExplorerContextType {
  currentFolder: FolderDataInterface;
  handleBackClick: () => void;
  handleItemClick: (item: FolderDataInterface | UploadedDocumentInterface) => void;
  currentPath: string[];
  selectedItem: string | null;
  setCurrentPath: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
  getBreadcrumbs: () => FolderDataInterface[];
}

const FolderExplorerContext = createContext<FolderExplorerContextType | undefined>(undefined);

export const useFolderExplorer = () => {
  const context = useContext(FolderExplorerContext);
  if (!context) {
    throw new Error('useFolderExplorer must be used within a FolderExplorerProvider');
  }
  return context;
};

export const FolderExplorerProvider = ({ folder_data, children }: { folder_data: FolderDataInterface, children: ReactNode }) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const getCurrentFolder = (): FolderDataInterface => {
    let current = folder_data;
    for (const id of currentPath) {
      const nextFolder = current.subfolder?.find(folder => folder.folder_identifier === id);
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
      setCurrentPath([...currentPath, item.folder_identifier]);
    }
    setSelectedItem('folder_identifier' in item ? item.folder_identifier : item.uploaded_document_id);
  };

  const handleBackClick = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };

  const getBreadcrumbs = () => {
    let breadcrumbs = [folder_data];
    let current = folder_data;
    for (const id of currentPath) {
      const nextFolder = current.subfolder?.find(folder => folder.folder_identifier === id);
      if (nextFolder) {
        breadcrumbs.push(nextFolder);
        current = nextFolder;
      } else {
        break;
      }
    }
    return breadcrumbs;
  };

  const currentFolder = getCurrentFolder();

  return (
    <FolderExplorerContext.Provider
      value={{
        currentFolder,
        handleBackClick,
        handleItemClick,
        currentPath,
        selectedItem,
        setCurrentPath,
        setSelectedItem,
        getBreadcrumbs
      }}
    >
      {children}
    </FolderExplorerContext.Provider>
  );
};
