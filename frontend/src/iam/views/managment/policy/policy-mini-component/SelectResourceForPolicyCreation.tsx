import React, { useState } from 'react';
import { Div, FlexBox, FlexOuterContainer,P, FlexBoxInner, Text } from '../../../../../components/common/StyledComponent'
import { FaSortDown } from "react-icons/fa6";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { PolicyContextProvider } from '../context/PolicyContext';
import { useGetAllOrganizationModelQuery } from '../../../../features/policiesAPI';
import { GrFormAdd } from "react-icons/gr";
import * as AiIcons from 'react-icons/ai'
import { BsTable } from "react-icons/bs";
import RegistrationInstruction from '../../../../../public/registerationn/RegistrationInstruction';
import { TextDecoderStream } from 'node:stream/web';
import useSelectPolicyResourceCreation from '../../../../hooks/useSelectPolicyResourceCreation';

const SelectResourceForPolicyCreation = () => {
    const navigate = useNavigate();
    const { data: project_model } = useGetAllOrganizationModelQuery();
    const { 
        showSelect,
        selectedApp,
        selectedModel,
        clickedResource,
        handleAppClick,
        handleModelClick,
        handleSelectChange,
        selectedResource
    } = useSelectPolicyResourceCreation()


  return (
    <PolicyContextProvider>
        <FlexOuterContainer className='h-full'>
            {showSelect && ( // Render the select dropdown only if showSelect is true
                <FlexBox className='flex space-x-4 h-full'>
                    <FlexBoxInner className='flex flex-col w-1/2 mx-auto h-full px-5 pt-5'>
                        <Div className='flex flex-col gap-2'>
                            <label  className='text-[14px] text-[#333] tracking-wide'>
                                Select Permission Level
                                <span className='block text-[11px] text-[#333] text-opacity-50'>select level of permission you want to create for and follow the prompt</span>
                            </label>
                            <FlexBoxInner className='relative'>
                                <select 
                                    id={`label_input`}
                                    className="select-md rounded-sm font-Poppins py-2 w-full text-[12px]" 
                                    value={selectedResource??""} 
                                    onChange={handleSelectChange}         
                                >
                                    <option className='text-[#333] text-opacity-50 bg-gray-100'><p className='text-[#333] text-opacity-50'>--Select--</p></option>
                                    <option value="" disabled>Select a resource</option>
                                    <option value="app_level">App level Permission</option>
                                    <option value="model_level">Model level Permission</option>
                                
                                </select>   
                                <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                                    {AiIcons.AiOutlineCaretDown({})}
                                </span>
                            </FlexBoxInner>
                        </Div> 
                        
                        <Div className='mt-6 h-full'>
                            {
                                !selectedResource && (
                                    <Div className='flex flex-col items-center gap-2 mt-[12%]'>
                                        <Text className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                                            No Permission level selected yet!
                                        </Text>
                                        <p className='text-[12px] text-[#333] text-opacity-60'>Select level permission to proceed the creation process </p>
                                       
                    
                                    </Div>
                                )
                            }
                            {selectedResource === "app_level" && (
                                <div className='flex flex-col flex-wrap border'>
                                    {project_model?.map((app, index) => (
                                        <Link 
                                            key={index} 
                                            className='py-1 hover:bg-gray-50 px-4 text-[12px]'
                                            to='just'
                                            onClick={() => handleAppClick(app.app_name)}
                                        >
                                            {app.app_name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {selectedResource === "model_level" && (
                                <div className='flex flex-col flex-wrap border py-4'>
                                        {project_model?.flatMap((app) =>
                                            app.models.map((model, index) => (
                                                <Link 
                                                    key={index} 
                                                    to={`just`} 
                                                    className='py-1 hover:bg-gray-50 px-4 flex items-center text-[12px]'
                                                    onClick={() => handleModelClick(model.model_name)} 
                                                >
                                                    {
                                                        BsTable({className: 'text-[#333] text-opacity-50'}) 
                                                    }
                                                    <span className='pl-2'>{model.display_name}</span>
                                                </Link>
                                            ))
                                        )}
                                    
                                </div>
                            )}
                        </Div>   
                    </FlexBoxInner>
                   

                </FlexBox>
            )}

            { clickedResource && ( <Outlet context={{ selectedResource: clickedResource, selectedApp, selectedModel }} /> )}
        </FlexOuterContainer>

    </PolicyContextProvider>
  )
}

export default SelectResourceForPolicyCreation