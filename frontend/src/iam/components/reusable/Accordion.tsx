import React, { useState } from 'react';
import { BiCaretRight, BiCaretDown } from "react-icons/bi";
import { AccordionProps } from '../interface/accordion-interface';
import useAccordion from '../../../hooks/useAccordion';
import { inherits } from 'node:util';



const Accordion = ({ accordionItems }: AccordionProps) => {
 
    const {activeItems, accordionToggleHandler, isActive} = useAccordion(
      accordionItems.length > 0 ? [accordionItems[0].id] : []
    )
    return (
      <div className="w-full">
        {
          accordionItems.map((item, index) => {
            return (
              <div key={item.id}>
                <div className={`px-5 py-2 flex justify-start items-center border-t border-b cursor-pointer ${item.id % 2 === 1 ? "bg-gray-100": "bg-inherit"} `} onClick={() => accordionToggleHandler(item.id)} >
                    {
                      isActive(item.id) ? <>{BiCaretDown({})}</> : <>{BiCaretRight({})}</>
                    }
                    <h6 className="pl-2">{item.title}</h6>
                </div>
                <div className={`pl-8 `}>
                  {
                    isActive(item.id) && (
                      <p>{item.content}</p>
                    )
                  }
                </div>
              </div>
            );
          })
        }
    </div>
  );
};

export default Accordion;
