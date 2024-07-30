import React from "react";
import { FlexBox, FlexBoxInner, FlexInnerContainer, FlexOuterContainer, Text } from "../../../components/common/StyledComponent";
import * as MdIcons from "react-icons/md";
import Tooltip from "../../../iam/components/reusable/Tooltip";
import { LiaPowerOffSolid } from "react-icons/lia";
import useLogout from "../../../iam/auth/logout/useLogout";
import { useSelector } from "react-redux";
import { username } from "../../../iam/api/auth";

const DocumentManagmentHeader = () => {

  const {onUserLogoutClicked} = useLogout()
  const loggedInUser = useSelector(username)

  return (
    <header className="border-b shadow-sm bg-gray-50 font-Poppins">
      <FlexInnerContainer className="flex justify-center items-center space-x-4 mx-20">
        <FlexBox className="w-1/4">
          <FlexBoxInner className="flex space-x-3 items-center cursor-pointer">
            <Tooltip content={`Go Back`}>
              <MdIcons.MdOutlineArrowBackIos />
            </Tooltip>
            <Tooltip content={`Go forward`}>
              <MdIcons.MdOutlineArrowForwardIos />
            </Tooltip> 
          </FlexBoxInner>
        </FlexBox>
        <FlexBox className="w-2/4">
          <input className="input-sm text-[13px] px-2" placeholder="https://documentmgmtsys.com" />
        </FlexBox>
        <FlexBox className="w-1/4 flex justify-end items-center">
        <FlexBox className={`flex justify-between items-center space-x-3`}>
          <Text className="text-[12px] text-blue-900">{loggedInUser}</Text>
          <FlexBoxInner className="py-2 flex items-center space-x-2 px-5 cursor-pointer bg-[#26cc86] rounded-md hover:bg-gray-300 hover:text-black text-white" onClick={onUserLogoutClicked}>
              <Text className="text-[12px]">Signout</Text>
              <LiaPowerOffSolid />
            </FlexBoxInner>
        </FlexBox>

        </FlexBox>
      </FlexInnerContainer>
    </header>
  );
};

export default DocumentManagmentHeader;
