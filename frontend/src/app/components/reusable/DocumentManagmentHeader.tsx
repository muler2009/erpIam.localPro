import React from "react";
import { Link } from "react-router-dom";
import { FlexBox, FlexBoxInner, FlexInnerContainer, Div, Text } from "../../../components/common/StyledComponent";
import { LiaPowerOffSolid } from "react-icons/lia";
import useLogout from "../../../iam/auth/logout/useLogout";
import { useSelector } from "react-redux";
import { username } from "../../../iam/api/auth";
import logo from '../../../assets/images/logo.png'
import { TfiBell } from "react-icons/tfi";
import { useGetNotificationQuery } from "../../services/notificationAPISlice";
import { useGetAllActionQuery } from "../../../iam/features/policiesAPI";

const DocumentManagmentHeader = () => {

  const {onUserLogoutClicked} = useLogout()
  const loggedInUser = useSelector(username)
  const { data} = useGetNotificationQuery()
  const notifications = data || []

  const unread = notifications?.filter(notification => notification.notification_read === false)

  return (
    
      <FlexInnerContainer className="flex justify-between items-center mx-8">
          <FlexBox className="flex space-x-3 items-center cursor-pointer">
              {/* <Text className="text-[30px] text-primary-green">edms</Text> */}
              <img src={logo}  className='w-12 h-12' />
              <FlexBoxInner className="flex flex-col">
                <Text className="text-[20px] text-[#5e2f05] font-semibold pt-1"> Oromia Land Bureau</Text>   
                <Text className="text-[10px] text-[#333]">Electronic document management</Text>                
              </FlexBoxInner>
          </FlexBox>
  
          <FlexBox className={`flex justify-between items-center space-x-5`}>
            <Link to={`notification`} className="relative">
              <Div className="text-[20px] w-8 h-8 bg-white flex justify-center items-center rounded-full relative">
                <TfiBell />
                <div className={`absolute -top-[6px] -right-1 text-[12px] w-4 h-4 flex justify-center items-center rounded-full text-white ${unread.length > 0 ? 'bg-red-500': 'bg-gray-200'}`}>{unread.length}</div> 
              </Div>
            
            </Link>
            {/* <Text className="text-[12px] text-blue-900">{loggedInUser}</Text> */}
            <Div className="py-1 flex items-center hover:bg-[#26559e] hover:text-white hover:border-[#26559e] space-x-2 border-black border-[2px] ml-5 px-5 cursor-pointer" onClick={onUserLogoutClicked}>
              <LiaPowerOffSolid />
              <Text className="text-[12px]">Logout</Text>
            </Div>
          </FlexBox>
      </FlexInnerContainer>

  );
};

export default DocumentManagmentHeader;
