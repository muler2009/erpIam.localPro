import React from 'react'
import { FlexBox, FlexBoxInner, Text, Div } from '../../../../components/common/StyledComponent'
import useDelegationContext from '../context/useDelegationContext' 
import { useGetAllUsersQuery } from '../../../../iam/features/userAPI'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import DatePickerComponent from '../../../components/common/DatePickerComponent'


const BasicDelegationInformation = () => {
    const {data: delegatee} = useGetAllUsersQuery()
    const {
        delegationData,
        handleDateInputChange,
        handleDelegationInputChange,
    } = useDelegationContext()

  return (
    <FlexBox className='h-full'>
        <FlexBoxInner className='bg-[#fff] flex justify-between items-center border-b border-opacity-50 py-3 px-5'>
            <Text className='text-[13px] font-semibold'>
                Delegation Information<span className='block font-normal text-[#333] text-[11px] text-opacity-70'>Fill the necessary delegation information and click next</span>
            </Text>

        </FlexBoxInner>
        <FlexBoxInner className='h-full'>
            <Div className='flex flex-col gap-2 py-3 px-5'>
                <label  className='text-[13px] text-[#333] tracking-wide'>
                    Select Delegetee User
                </label>
                <FlexBoxInner className='relative'>
                    <select 
                        id={`delegetee_input`}
                        className="select-md rounded-sm font-Poppins py-2 w-full text-[12px]" 
                        name='delegatee_user'
                        value={delegationData?.delegatee_user} 
                        onChange={handleDelegationInputChange}
                           
                    >
                        <option disabled value={'selected'}>--Select delegetee user--</option>
                       {
                        delegatee?.map((user, index) => {
                            return(
                                <option className='' key={index}>
                                    {user.first_name} {user.last_name}
                                </option>
                            )
                        })
                       }    
                    
                    
                    </select>   
                    <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                        <AiIcons.AiOutlineCaretDown  />
                    </span>
                </FlexBoxInner>
            </Div> 

            <Div className='flex space-x-3'>
                <div className='flex flex-col gap-2 text-sm relative flex-grow whitespace-normal font-normal px-5 py-2'>
                    <label className='text-[13px] text-[#333] tracking-wide'>Start Date</label>
                    <div className='input-sm py-2 pl-10 justify-start items-center relative '>
                        <DatePickerComponent 
                            selected={delegationData.delegation_start_date ? new Date(delegationData.delegation_start_date) : null} 
                            className="px-2 font-Poppins text-[12px]"
                            onChange={(date) => handleDateInputChange(date ?? new Date(), 'delegation_start_date')}
                        /> 
                        
                        <div className='absolute left-2 top-2'>
                            <BsIcons.BsFillCalendarCheckFill size={20} className=' text-black text-opacity-40'/>
                        </div>
                    </div>
                    <small className='text-[#8a8080] text-[12px] -mt-1 '>Required: Delegation starts date</small>
                </div>

                <div className='flex flex-col gap-2 text-sm relative flex-grow whitespace-normal font-normal px-5 py-2'>
                    <label className='text-[13px] text-[#333] tracking-wide'>Expire Date</label>
                    <div className='input-sm py-2 pl-10 justify-start items-center relative '>
                        <DatePickerComponent 
                            selected={delegationData.delegation_end_date ? new Date(delegationData.delegation_end_date) : null}  
                            className="px-2 font-Poppins text-[12px]"
                            onChange={(date) => handleDateInputChange(date ?? new Date(), 'delegation_end_date')}
                        /> 
                        
                        <div className='absolute left-2 top-2'>
                            <BsIcons.BsFillCalendarCheckFill size={20} className=' text-black text-opacity-40'/>
                        </div>
                    </div>
                    <small className='text-[#8a8080] text-[12px] -mt-1 '>Required: Delegation expire date</small>
                </div>
            </Div>
        </FlexBoxInner>

       
    </FlexBox>
  )
}

export default BasicDelegationInformation