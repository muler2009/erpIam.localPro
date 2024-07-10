import React from "react";
import { FlexBox, FlexBoxInner, FlexInnerContainer, FlexOuterContainer } from "../../../components/common/StyledComponent";
import * as MdIcons from "react-icons/md";
import Tooltip from "../../../iam/components/reusable/Tooltip";

const DocumentManagmentHeader = () => {
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
          <input className="input-sm text-[13px]" />
        </FlexBox>
        <FlexBox className="w-1/4 flex justify-end items-center">
          <MdIcons.MdOutlineArrowForwardIos />
        </FlexBox>
      </FlexInnerContainer>
    </header>
  );
};

export default DocumentManagmentHeader;
