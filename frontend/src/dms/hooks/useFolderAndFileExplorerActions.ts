import React, {useState} from 'react'
import { useGetFolderQuery } from '../services/folderAPISlice';
import { FolderDataInterface } from '../models/folder-models';

const useFolderAndFileExplorerActions = () => {
    const { data: folder_data } = useGetFolderQuery();  // fetch the folder related data from the backend
    const [currentFolder, setCurrentFolder] = useState<any>(null);  //keeps track of the folder data currently being displayed
    const [openStates, setOpenStates] = useState<boolean[]>([]); //  keeps track of whether each file is open or closed.
    const [currentPath, setCurrentPath] = useState<any[]>([]); 
    const [forwardStack, setForwardStack] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<string | null>(null); 
    const [isSearching, setIsSearching] = useState(false);
    const [search, setSearch] = useState('')


    // const handleBackClick = () => {
    //     if (currentPath.length > 0) {
    //       const lastFolder = currentPath[currentPath.length - 1];
    //       setForwardStack([...forwardStack, currentFolder]); // Add current folder to forward stack
    //       setCurrentPath(currentPath.slice(0, -1));
    //       setCurrentFolder(currentPath.length > 1 ? currentPath[currentPath.length - 2].subfolder : folder_data); // Set current folder to last folder's parent or root
    //       setOpenStates(new Array((lastFolder.subfolder || folder_data).length).fill(false));
    //     }
    //   };

    const handleBackClick = () => {
      if (currentPath.length > 0) {
        const lastFolder = currentPath[currentPath.length - 1];
        setForwardStack([currentFolder, ...forwardStack]); // Add current folder to the beginning of forward stack
        const newPath = currentPath.slice(0, -1);
        setCurrentPath(newPath);
        
        if (newPath.length > 0) {
          const parentFolder = newPath[newPath.length - 1];
          setCurrentFolder(parentFolder.subfolder || []);
        } else {
          setCurrentFolder(folder_data);
        }
        
        setOpenStates(new Array((lastFolder.subfolder || folder_data).length).fill(false));
      }
    };
    const handleForwardClick = () => {
      if (forwardStack.length > 0) {
        const [nextFolder, ...remainingForwardStack] = forwardStack;
        setCurrentFolder(nextFolder);
        setCurrentPath([...currentPath, nextFolder]);
        setOpenStates(new Array(nextFolder.length).fill(false));
        setForwardStack(remainingForwardStack);
      }
    };

    const handleFolderDoubleClick= (folder: any) => {    
      if (folder.subfolder || folder.uploaded_file) {
        const newFolderContent = [
          ...(folder.subfolder || []),
          ...(folder.uploaded_file || [])
        ];
    
        setCurrentFolder(newFolderContent);
        setCurrentPath([...currentPath, folder]);
        setOpenStates(new Array(newFolderContent.length).fill(false));
        setForwardStack([]);
        
        // Clear search state when navigating into a folder
        setSearch(''); // Clear the search input
        setIsSearching(false); // Reset searching state
      }
    };
    
      

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearch(value);
      setIsSearching(value.length > 0); // Update search state based on input
    };

    const handleItemClick = (folder: any) => {
      if (folder.subfolder || folder.uploaded_file) {
        const newFolderContent = [
          ...(folder.subfolder || []),
          ...(folder.uploaded_file || [])
        ];
        setCurrentFolder(newFolderContent);
        setCurrentPath([...currentPath, folder]);
        setOpenStates(new Array(newFolderContent.length).fill(false));
        setForwardStack([]); // Clear forward stack on new navigation
      }
    };
  
    const toggleItem = (index: number) => {
      setOpenStates(prevState => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    };
  
  const getLastPathName = () => {  
    if (currentPath.length === 0) {
      return null;
    }
    const lastObject = currentPath[currentPath.length - 1];
    return lastObject.folder_name;
  }
  
    
  return{
    folder_data,
    openStates,
    handleBackClick,
    handleItemClick,
    handleFolderDoubleClick,
    handleForwardClick,
    toggleItem,
    setCurrentFolder,
    currentFolder,
    setOpenStates,
    currentPath,
    forwardStack,
    getLastPathName,
    search,
    handleSearchChange,
    isSearching
  }
}

export default useFolderAndFileExplorerActions;




// const handleForwardClick = () => {
      //   if (forwardStack.length > 0) {
      //     const nextFolder = forwardStack.pop();
      //     setCurrentFolder(nextFolder);
      //     setCurrentPath([...currentPath, nextFolder]);
      //     setOpenStates(new Array(nextFolder.length).fill(false));
      //     setForwardStack([...forwardStack]); // Update the forward stack state
      //   }
      // };
  
    // a function that update the currently clicked folder 
    // const handleItemClick = (folder: any) => {
    //     if (folder.subfolder) {
    //       setCurrentFolder(folder.subfolder);
    //       setCurrentPath([...currentPath, folder]);
    //       setOpenStates(new Array(folder.subfolder.length).fill(false));
    //       setForwardStack([]); // Clear forward stack on new navigation
    //     }
    //   };