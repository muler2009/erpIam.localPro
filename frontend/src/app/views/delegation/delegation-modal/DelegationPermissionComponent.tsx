import React from 'react'
import { FlexBox, FlexBoxInner, Text, Div } from '../../../../components/common/StyledComponent'
import useDelegationContext from '../context/useDelegationContext'

const DelegationPermissionComponent = () => {
    const {delegationData, handleDelegationInputChange} = useDelegationContext()

  return (
    <FlexBox className='h-full'>
        <FlexBoxInner className='px-5 mb-5'>
            <Text className='text-[13px] font-semibold py-5'>
                Permissions<span className='block font-normal text-[#333] text-[11px] text-opacity-70'>Select the permission given for delegetee</span>
            </Text>

            <Div className='border flex flex-col gap-2 overflow-y-scroll py-3 bg-white'>
                <div className='ml-5'>
                    <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                    <input 
                        type="checkbox" 
                        name='is_delegation_active'
                        id="is_model_level_input" 
                        className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']" 
                        // checked={delegationData?.is_delegation_active}  
                        // onChange={handleDelegationInputChange}
                    />
                    <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#000] font-semibold'>
                        Full Access <span className='text-pretty text-opacity-50 font-normal text-[11px]'>(The delegetee has full permission to do task on behalf of the you)</span>
                    </Text>
                    </label>  
                </div>   
                <div className='ml-5'>
                    <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                    <input 
                        type="checkbox" 
                        name='is_delegation_active'
                        id="is_model_level_input" 
                        className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']" 
                        // checked={delegationData?.is_delegation_active}  
                        // onChange={handleDelegationInputChange}
                    />
                   <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#000] font-semibold'>
                        Request Approval Only 
                    </Text>
                    </label>  
                </div>   
                <div className='ml-5'>
                    <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                    <input 
                        type="checkbox" 
                        name='is_delegation_active'
                        id="is_model_level_input" 
                        className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']" 
                        // checked={delegationData?.is_delegation_active}  
                        // onChange={handleDelegationInputChange}
                    />
                    <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#000] font-semibold'>
                        Read Only
                    </Text>
                    </label>  
                </div>   
                <div className='ml-5'>
                    <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                    <input 
                        type="checkbox" 
                        name='is_delegation_active'
                        id="is_model_level_input" 
                        className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']" 
                        // checked={delegationData?.is_delegation_active}  
                        // onChange={handleDelegationInputChange}
                    />
                    <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#000] font-semibold'>
                        Write Only 
                    </Text>
                    </label>  
                </div>   
                <div className='ml-5'>
                    <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                    <input 
                        type="checkbox" 
                        name='is_delegation_active'
                        id="is_model_level_input" 
                        className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']" 
                        // checked={delegationData?.is_delegation_active}  
                        // onChange={handleDelegationInputChange}
                    />
                    <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#000] font-semibold'>
                        Change Only 
                    </Text>
                    </label>  
                </div>  
                <div className='ml-5'>
                    <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                    <input 
                        type="checkbox" 
                        name='is_delegation_active'
                        id="is_model_level_input" 
                        className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']" 
                        // checked={delegationData?.is_delegation_active}  
                        // onChange={handleDelegationInputChange}
                    />
                    <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#000] font-semibold'>
                        Delete Only 
                    </Text>
                    </label>  
                </div>  

            </Div>
        </FlexBoxInner>
        <FlexBoxInner className='ml-5 py-2'>
            <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                <input 
                    type="checkbox" 
                    name='is_delegation_active'
                    id="is_model_level_input" 
                    className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']" 
                    checked={delegationData?.is_delegation_active}  
                    onChange={handleDelegationInputChange}
                />
                <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>
                    Activate the delegation 
                </Text>
            </label>  
        </FlexBoxInner>   
    
    </FlexBox>
  )
}

export default DelegationPermissionComponent