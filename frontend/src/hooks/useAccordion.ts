import { useState } from "react"

const useAccordion =  <T>(initialItems: T[] = []) => {

    const [activeItems, setActiveItems] = useState<T[]>(initialItems); // active element tracker

    const accordionToggleHandler = (individualItem: T) => { 
        setActiveItems((prev) =>
          prev.includes(individualItem) ? prev.filter((i) => i !== individualItem) : [...prev, individualItem]
        );
      };

    const isActive = (item: T) => activeItems.includes(item); 
    const reset = () => setActiveItems([]); // to close all when necessary

  return {
    activeItems,
    accordionToggleHandler,
    isActive,
    reset,
    setActiveItems, // optional external setter
  }
}

export default useAccordion