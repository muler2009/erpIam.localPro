import React, { useState } from 'react';
import { BiCaretRight, BiCaretDown } from "react-icons/bi";
import { AccordionProps } from '../interface/accordion-interface';
import useAccordion from '../../../hooks/useAccordion';



const Accordion = ({ accordionItems }: AccordionProps) => {
 
    const {activeItems, accordionToggleHandler, isActive} = useAccordion(
      accordionItems.length > 0 ? [accordionItems[0].id] : []
    )
    return (
      <div className="w-full">
        {
          accordionItems.map((item) => {
            return (
              <div key={item.id}>
                <div className="px-5 py-2 flex justify-start items-center bg-[#4e4e4e] border-t text-white cursor-pointer" onClick={() => accordionToggleHandler(item.id)} >
                    {
                      isActive(item.id) ? <BiCaretDown /> : <BiCaretRight />
                    }
                    <h6 className="pl-2">{item.title}</h6>
                </div>

                  {
                    isActive(item.id) && (
                      <div className="bg-[#2e2e2e] bg-opacity-75 pl-8 py-3 text-white">
                        {item.content}
                      </div>
                    )
                  }
              </div>
            );
          })
        }
    </div>
  );
};

export default Accordion;
