import React, { useState } from 'react';
import { FlexBox, FlexOuterContainer,P } from '../../../../../components/common/StyledComponent'
import { FaSortDown } from "react-icons/fa6";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { PolicyContextProvider } from '../context/PolicyContext';

const SelectResourceForPolicyCreation = () => {
    const navigate = useNavigate();
    const [selectedResource, setSelectedResource] = useState<string | null>(null);
    const [showSelect, setShowSelect] = useState(true); 

  
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const resource = event.target.value;
        const selectedText = event.target.selectedOptions[0].text;
        console.log(selectedText)
        setSelectedResource(selectedText);
        setShowSelect(false); // Hide the select dropdown when an option is selected
        if (resource) {
            navigate(resource); 
        }
    };

  return (
    <PolicyContextProvider>
        <FlexOuterContainer className='flex flex-col pt-3'>
            {showSelect && ( // Render the select dropdown only if showSelect is true
                <FlexBox className='flex space-x-2'>
                    <FaSortDown />
                        <select value={selectedResource??""} onChange={handleSelectChange} className="border rounded p-1">
                            <option value="" disabled>Select a resource</option>
                            <option value="just">FileDatabase</option>
                            <option value="just">Other Resource</option>
                            {/* Add more options as needed */}
                        </select>
                        </FlexBox>
                    )}


            {/* <FlexBox className='flex space-x-2'>
                <FaSortDown />
                    <select value={selectedResource} onChange={handleSelectChange} className="border rounded p-1">
                        <option value="" disabled>Select a resource</option>
                        <option value="just">Just</option>
                        <option value="/other-resource">Other Resource</option>
                        
                    </select>
            </FlexBox> */}
            <Outlet context={{ selectedResource }}  />
        </FlexOuterContainer>

    </PolicyContextProvider>
  )
}

export default SelectResourceForPolicyCreation