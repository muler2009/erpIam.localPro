import { Footer, Header } from "../../iam/components/reusable";
import { Outlet } from "react-router-dom";
import menus from "../components/reusable/side-tree/menus";
import SideBarMain from "../components/reusable/side-tree/SideBarMain";
import {
  FlexBox,
  FlexBoxInner,
  FlexOuterContainer,
  P,
  Text,
} from "../../components/common/StyledComponent";
import DocumentManagmentHeader from "../components/reusable/DocumentManagmentHeader";
import * as HiIcons from "react-icons/hi2";
import { FaBars } from "react-icons/fa";
import Routes from "../Routes/Routes";
import { LiaPowerOffSolid } from "react-icons/lia";

const DMSDashboard = () => {
  return (
    <FlexBoxInner className="flex flex-col h-[96vh] bg-gray-100 font-Poppins">
      <FlexBox className="">
        <DocumentManagmentHeader />
      </FlexBox>
      <FlexBox className="flex flex-grow">
        <FlexBoxInner className="flex space-x-1 my-[1px] w-[20%] border-r">
          <FlexBox className="pt-3 px-2 bg-[#fff]">
            <FaBars size={18} />
          </FlexBox>
          <FlexBox className="flex flex-1 flex-col gap-3 py-5 bg-[#fff]">
            <FlexBoxInner className="flex justify-start px-5 items-center ">
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center">
                  <HiIcons.HiClipboardDocumentCheck
                    size={60}
                    className="text-[#1c75fc]"
                  />
                  <div className="flex flex-col">
                    <Text className="font-Rubik tracking-wide text-xl text-[#1c75fc] whitespace-nowrap">
                      Document Management
                    </Text>
                    <P className="float-right font-Poppins text-sm -pt-1">
                      system
                    </P>
                  </div>
                </div>
              </div>
            </FlexBoxInner>
            <FlexBoxInner className="pt-5 px-5 flex-grow">
              <SideBarMain menus={menus} />
            </FlexBoxInner>
            <FlexBoxInner className="py-3 flex justify-end items-center space-x-2 px-2 cursor-pointer pr-10">
              <LiaPowerOffSolid />
              <Text className="text-[12px]">Logout</Text>
            </FlexBoxInner>
          </FlexBox>
        </FlexBoxInner>
        <FlexBox className="w-full flex flex-col bg-[#fff] m-[1px]">
          <Outlet />
          <Routes />
        </FlexBox>
      </FlexBox>
      <Footer />
    </FlexBoxInner>
  );
};

export default DMSDashboard;
