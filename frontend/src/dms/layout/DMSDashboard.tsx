import { Footer, Header } from "../../iam/components/reusable";
import { Outlet } from "react-router-dom";
import sidebar_link from "../components/reusable/side-tree/menus";
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

const DMSDashboard = () => {
  return (
    <FlexBoxInner className="flex flex-col h-[96vh] bg-gray-100 font-Poppins overflow-y-auto">
      <FlexBox className="">
        <DocumentManagmentHeader />
      </FlexBox>
      <FlexBox className="flex flex-grow">
        <FlexBoxInner className="flex space-x-1 my-[1px] w-[18%]">
          {/* <FlexBox className="pt-3 px-2 bg-[#fff]">
            <FaBars size={18} />
          </FlexBox> */}
          <FlexBox className="flex flex-1 flex-col gap-3 py-5 bg-[#f7f9fb;]">
            <FlexBoxInner className="flex justify-start px-5 items-center ">
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center">
                  <HiIcons.HiClipboardDocumentCheck
                    size={60}
                    className="text-[#26cc86]"
                  />
                  <div className="flex flex-col">
                    <Text className="font-Oswald tracking-wide text-[2rem] text-[#26cc86] whitespace-nowrap">
                      oDMS
                    </Text>
                    <P className="float-right font-Poppins text-sm -pt-1">
                      system
                    </P>
                  </div>
                </div>
              </div>
            </FlexBoxInner>
            <FlexBoxInner className="pt-5 flex flex-col flex-grow">
              <SideBarMain menus={sidebar_link} />
              {/* <Category /> */}
            </FlexBoxInner>
          
          
          </FlexBox>
        </FlexBoxInner>
        <FlexBox className="w-full flex flex-col border">
          <Outlet />
          <Routes />
        </FlexBox>
      </FlexBox>
      <Footer />
    </FlexBoxInner>
  );
};

export default DMSDashboard;
