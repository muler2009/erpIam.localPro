import React, {useCallback, useState} from 'react'
import { shared } from '../constants/menu-items/shared'

const useUtils = () => {
    const [drop, setDrop] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<{[key: string]: boolean}>({})     
    const [activeLabel, setActiveLabel] = useState<string | null>(null);


    const handleIsOpenCloseMenu = (label: string) => {
        setIsOpen(prevState => ({
          ...prevState,
          [label]: !prevState[label],
        }));
      };

    // const handleDropdownToggle = (label: string) => {
    //     setIsOpen(prevState => {
    //         const newOpenState: { [key: string]: boolean } = {};
    //         // Close all other menu items
    //         shared.forEach(item => {
    //           if (item.label !== label) {
    //             newOpenState[item.label] = false;
    //           }
    //         });
        
    //         // Toggle the selected menu item
    //         newOpenState[label] = !prevState[label];
    //         setActiveLabel(prevState[label] ? null : label);
        
    //         return {
    //           ...prevState,
    //           ...newOpenState,
    //         };
    //       });
    // };

    // const handleDropdownToggle = useCallback((label: string) => {
    //   setIsOpen(prevState => {
    //     const newOpenState: { [key: string]: boolean } = {};
    //     // Close all other menu items
    //     shared.forEach(item => {
    //       if (item.label !== label) {
    //         newOpenState[item.label] = false;
    //       }
    //     });
    
    //     // Toggle the selected menu item
    //     newOpenState[label] = !prevState[label];
    //     setActiveLabel(prevState[label] ? null : label);
    
    //     return {
    //       ...prevState,
    //       ...newOpenState,
    //     };
    //   });

    // }, [isOpen])

    const wrapText = (text: string, maxLineLength: number = 10): string => {
      let wrappedText = '';
      for (let i = 0; i < text.length; i += maxLineLength) {
        wrappedText += text.substring(i, i + maxLineLength) + '\n';
      }
      return wrappedText;
    }

    const handleDropdownToggle = useCallback((label: string) => {
      return new Promise((resolve, reject) => {
        setIsOpen(prevState => {
          const newOpenState: { [key: string]: boolean } = {};
          shared.forEach(item => {
            if (item.label !== label) {
              newOpenState[item.label] = false;
            }
          });
          newOpenState[label] = !prevState[label];
          setActiveLabel(prevState[label] ? null : label);
          resolve(newOpenState);
          return {
            ...prevState,
            ...newOpenState,
          };
        });
      });
    }, []);

  return {
    isOpen,
    setIsOpen,
    handleDropdownToggle,
    activeLabel,
    handleIsOpenCloseMenu,
    setActiveLabel,
    wrapText


  }
}

export default useUtils