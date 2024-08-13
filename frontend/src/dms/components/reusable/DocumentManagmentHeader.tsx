import React from "react";
import { FlexBox, FlexBoxInner, FlexInnerContainer, FlexOuterContainer, Text } from "../../../components/common/StyledComponent";
import * as MdIcons from "react-icons/md";
import Tooltip from "../../../iam/components/reusable/Tooltip";
import { LiaPowerOffSolid } from "react-icons/lia";
import useLogout from "../../../iam/auth/logout/useLogout";
import { useSelector } from "react-redux";
import { username } from "../../../iam/api/auth";

{/* <Tooltip content={`Go Back`}>
<MdIcons.MdOutlineArrowBackIos />
</Tooltip>
<Tooltip content={`Go forward`}>
<MdIcons.MdOutlineArrowForwardIos />
</Tooltip>  */}

const DocumentManagmentHeader = () => {

  const {onUserLogoutClicked} = useLogout()
  const loggedInUser = useSelector(username)

  return (
    <header className="border-b shadow-sm bg-gray-50 font-Poppins">
      <FlexInnerContainer className="flex justify-between items-center mx-8">
          <FlexBox className="flex space-x-3 items-center cursor-pointer">
              <Text className="text-[30px] text-primary-green">edms</Text>
              <FlexBoxInner className="flex flex-col">
                <Text className="text-[10px] text-[#333] font-semibold text-opacity-50 pt-1">Electronic document management</Text>   
                <Text className="text-[10px] text-[#333] font-semibold text-opacity-50">System</Text>                
              </FlexBoxInner>
          </FlexBox>
  
          <FlexBox className={`flex justify-between items-center space-x-3`}>
            <Text className="text-[12px] text-blue-900">{loggedInUser}</Text>
            <FlexBoxInner className="py-2 flex items-center space-x-2 px-5 cursor-pointer bg-[#26cc86] rounded-md hover:bg-gray-300 hover:text-black text-white" onClick={onUserLogoutClicked}>
                <Text className="text-[12px]">Signout</Text>
                <LiaPowerOffSolid />
              </FlexBoxInner>
          </FlexBox>
      </FlexInnerContainer>
    </header>
  );
};

export default DocumentManagmentHeader;
