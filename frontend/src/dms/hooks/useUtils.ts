import React, {useState} from 'react'
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

    const handleDropdownToggle = (label: string) => {
        setIsOpen(prevState => {
            const newOpenState: { [key: string]: boolean } = {};
            // Close all other menu items
            shared.forEach(item => {
              if (item.label !== label) {
                newOpenState[item.label] = false;
              }
            });
        
            // Toggle the selected menu item
            newOpenState[label] = !prevState[label];
            setActiveLabel(prevState[label] ? null : label);
        
            return {
              ...prevState,
              ...newOpenState,
            };
          });
    };


  return {
    isOpen,
    handleDropdownToggle,
    activeLabel,
    handleIsOpenCloseMenu


  }
}

export default useUtils