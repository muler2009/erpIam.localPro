import React, {useCallback, useState} from 'react'
import { shared } from '../constants/menu-items/shared'

const useUtils = () => {
    const [isOpen, setIsOpen] = useState<{[key: string]: boolean}>({})  
    const [open, setOpen] = useState<boolean>(false)     
    const [activeLabel, setActiveLabel] = useState<string | null>(null);
    const [dropdown, setDropDown] = useState<boolean>(false)






    const handleIsOpenCloseMenu = (label: string) => {
        setIsOpen(prevState => ({
          ...prevState,
          [label]: !prevState[label],
        }));
      };

    const handleIsOpenCloseMenuModal = useCallback(() => {
      setOpen(prevOpen => !prevOpen)
    }, [])

    const handledropdownMenu = useCallback(() => {
      setDropDown(prevDropDown => !prevDropDown)
    }, [])

  
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
    open,
    dropdown,
    activeLabel,
    setIsOpen,
    handleDropdownToggle,
    handledropdownMenu,
    handleIsOpenCloseMenu,
    handleIsOpenCloseMenuModal,
    setActiveLabel,
    wrapText


  }
}

export default useUtils