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
  Div
} from "../../components/common/StyledComponent";
import DocumentManagmentHeader from "../components/reusable/DocumentManagmentHeader";
import * as HiIcons from "react-icons/hi2";
import { FaBars } from "react-icons/fa";
import Routes from "../Routes/Routes";
import user from '../../assets/images/user-picture.png'
import { fullName } from "../../iam/api/auth";
import { useSelector } from "react-redux";

const DMSDashboard = () => {

  const full_name = useSelector(fullName)
  
  return (
    <FlexBox className="flex h-full">
      <FlexBoxInner className="my-[1px] w-[20%]">
        <Div className="flex flex-col space-y-3">
          <div className="flex space-x-3 px-5 pt-4 pb-2">
            {/* <div className="h-16 w-16 rounded-full border" /> */}
            <img src={user} alt="user profile picture" className="h-16 w-16 rounded-full border object-cover object-center" />
            <div className="flex items-center">
              <p className="text-[14px] font-semibold font-Poppins">
                {full_name} <span className="block text-[12px] font-normal">position of the user</span> 
              </p>
            </div>
          </div>
          <Div className="pt-3 flex flex-col flex-grow">
            <SideBarMain menus={sidebar_link} />
          </Div>
        </Div>

      </FlexBoxInner>
      <FlexBox className="w-full border overflow-y-scroll">
        <Outlet />
        <Routes />
      </FlexBox>
    </FlexBox> 
  );
};

export default DMSDashboard;
