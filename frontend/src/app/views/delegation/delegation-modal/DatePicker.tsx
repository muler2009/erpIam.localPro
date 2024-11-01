import React, {useState} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import DatePickerComponent from '../../../components/common/DatePickerComponent';
import * as BsIcons from 'react-icons/bs'


const DatePickerw = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className='flex flex-col gap-2 text-sm relative flex-grow whitespace-normal font-normal bg-[#eff3f4] px-5 py-2'>
        <label className='font-Rubik text-[15px]'>BirthDate *</label>
        <div className='input-sm py-2 pl-10 justify-start items-center relative '>
            
              <DatePickerComponent 
                  selected={startDate} 
                  className={`px-2`}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setStartDate(date);
                    }
                  }}
              />   
            
              {/* onChange={(date) => handleDateInputChange(date, 'employee_birth_date') }                    */}
            <div className='absolute left-2 top-2'>
              <BsIcons.BsFillCalendarCheckFill size={20} className=' text-black text-opacity-40'/>
            </div>
        </div>
        <small className='text-[#8a8080] text-[12px] -mt-1 '>Required: Birthdate</small>
    </div>
  );

}

export default DatePickerw