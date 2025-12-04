import React, {SetStateAction, useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import DatePicker from 'react-datepicker';
import * as Bs from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import * as Sl from "react-icons/sl";

const range = (start: any, end: any, step = 1) =>  {
    const length = Math.floor((end - start) / step) + 1;
    return Array.from({ length }, (_, i) => start + i * step);
  }

interface DataComponentInterface {
    className?: string;
    selected?: Date | null;
    onChange?: (date: Date | null, event: React.SyntheticEvent<any> | undefined) => void;
}

const DatePickerComponent =  ({ className, selected, onChange }: DataComponentInterface) => {
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
  
    const datePickerProps = {
      placeholderText: 'Opening date',
      disabledKeyboardNavigation: true,
      selected,
      onChange,
      dateFormat: 'yyyy-MM-dd',
      timeClassName: (time: any) => (time.getHours() > 12 ? 'text-green-600' : 'text-red-700')
    };
    
    return (
        <DatePicker inline className=" text-black font-Poppins text-[10px] focus:outline-none placeholder-transparent border-gray-600 border-gray-30 text-sm "
            renderCustomHeader={({
            
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex justify-center items-center space-x-2 py-3 bg-transparent pr-3">
                {
                  Bs.BsFillArrowLeftCircleFill({
                    size: 25,
                    className: "cursor-pointer", 
                    onClick: decreaseMonth
                  })
                }
                <select value={getYear(date)} className="px-1 focus:border-none"  >
                 {/* onChange={({ target: { value } }) => changeYear(value)} */}
                  {
                    years.map((option) => (
                        <option key={option} value={option} >
                            {option}
                        </option>
                  ))}
                </select>
                <select className='focus:outline-none focus:border-none' value={months[getMonth(date)]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
                  {
                    months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  }
                </select>
                  {
                    Bs.BsArrowRightCircleFill({
                      size: 25,
                      className: "cursor-pointer", 
                      onClick: increaseMonth
                    })
                  }
                
                
              </div>
            )}
            {...datePickerProps}  
        />
        
    );
  };

export default DatePickerComponent