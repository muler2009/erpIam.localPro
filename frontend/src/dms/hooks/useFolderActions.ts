import { useState } from 'react';

const useFolderActions = () => {
    const [activeLabel, setActiveLabel] = useState<string | null>(null);   
    const [openFolderId, setOpenFolderId] = useState<{[key: string]: boolean}>({})
   
    // a function to handle the opriton modal
    const handleOptionsAction = (label: string) => {
        setOpenFolderId(prevState => ({
          ...prevState,
          [label]: !prevState[label],
        }));
      };

      // option menu handler 
      const handleOptionsToggle = (folderName: string) => {
        setOpenFolderId(prevState => ({
            ...prevState,
            [folderName]: !prevState[folderName],
        }));
    };

    return{
        activeLabel,
        setActiveLabel,
        openFolderId,
        setOpenFolderId,
        handleOptionsAction,
        handleOptionsToggle
    }
};

export default useFolderActions;