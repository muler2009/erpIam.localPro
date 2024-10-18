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

const SelectResourceForPolicyCreation = () => {
    const navigate = useNavigate();
    const [selectedResource, setSelectedResource] = useState<string | null>(null);
    const [showSelect, setShowSelect] = useState(true); 
    const {data: project_model} = useGetAllOrganizationModelQuery()

    console.log(project_model)

  
    // const handleSelectChange2 = (event: any) => {
    //     const resource = event.target.value;
    //     // const selectedText = event.target.selectedOptions[0].text;
    //     console.log(selectedText)
    //     setSelectedResource(selectedText);
    //     setShowSelect(false); // Hide the select dropdown when an option is selected
    //     if (resource) {
    //         navigate(resource); 
    //     }
    // };

    const [activeApp, setActiveApp] = useState<string | null>(null);

    const toggleDropdown = (appName: string) => {
        setActiveApp(activeApp === appName ? null : appName);
    };

    const [clickedResource, setClickedResource] = useState<string | null>(null);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedResource(event.target.value);
    };

    const handleClick = (resource: string) => {
        setClickedResource(resource); // Set clicked resource (app or model) to display in Outlet
        setShowSelect(false)
    };


  return (
    <PolicyContextProvider>
        <FlexOuterContainer className='h-full'>
            {showSelect && ( // Render the select dropdown only if showSelect is true
                <FlexBox className='flex space-x-4 h-full'>
                    <FlexBoxInner className='flex flex-col w-1/2 h-full'>
                        <Div className='flex flex-col gap-2'>
                            <label  className='text-[12px] text-[#333] tracking-wide'>Select Resource</label>
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
                                    <AiIcons.AiOutlineCaretDown  />
                                </span>
                            </FlexBoxInner>
                        </Div> 
                        
                        <Div className='mt-6 h-full'>
                            {
                                !selectedResource && (
                                    <div className='flex justify-center items-center '>Nothing selected</div>
                                )
                            }
                            {selectedResource === "app_level" && (
                                <div className='flex flex-col flex-wrap border'>
                                    {project_model?.map((app, index) => (
                                        <Link 
                                            key={index} 
                                            className='py-1 hover:bg-gray-50 px-4 text-[12px]'
                                            to='just'
                                            onClick={() => handleClick(app.app_name)}
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
                                                    onClick={() => handleClick(model.model_name)}
                                                >
                                                    <BsTable className='text-[#333] text-opacity-50' />
                                                    <span className='pl-2'>{model.model_name}</span>
                                                </Link>
                                            ))
                                        )}
                                    
                                </div>
                            )}
                        </Div>   
                    </FlexBoxInner>
                    <FlexBoxInner className='w-1/2 border h-full mt-5'>
                        
                        <Text className=''>Instruction</Text>
                    </FlexBoxInner>

                </FlexBox>
            )}

            { clickedResource && ( <Outlet context={{ selectedResource: clickedResource }} /> )}

            {/* <Outlet context={{ selectedResource }}  /> */}
        </FlexOuterContainer>

    </PolicyContextProvider>
  )
}

export default SelectResourceForPolicyCreation