import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useGetRequestsRecivedForApprovalQuery } from "../../../services/requestAPISlice";
import { useGetNotificationQuery } from "../../../services/notificationAPISlice";
import { FlexBox, FlexBoxInner, Text } from "../../../../components/common/StyledComponent";
import { NotificationAPIResponse } from "../../../models/notification-models";
import * as PiIcons from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import NotificationList from "./NotificationList";


export const NotificationDashboard = () => {
    const [params, setParams] = useState({ page: 1, limit: 10 });
    const {data, isSuccess, error, isLoading} = useGetNotificationQuery() 
    const notifications = data || [];  // Adjust based on your API response structure
    const unreadCount = Array.isArray(notifications) ? notifications.filter(notification => !notification.notification_read).length : 0;
  
    const { data: req} = useGetRequestsRecivedForApprovalQuery({ current_state: 'pending for approval' })
    const handleNextPage = () => {
      setParams(prev => ({ ...prev, page: prev.page + 1 }));
    };
  
    const handlePrevPage = () => {
      setParams(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }));
    };
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading notifications.</p>;
  
    return (
      <FlexBox className="flex flex-col justify-between items-center">
            <FlexBoxInner >
                {
                    data?.length 
                    ? (
                        data?.map((notification: NotificationAPIResponse) => (
                          <NotificationList key={notification.notification_id} notification={notification} unreadCount={unreadCount} />
                        ))
                    ) : ( 
                        <p className="flex justify-center">No new notification</p> 
                    )
                    
                }
            </FlexBoxInner>
            {/* <FlexBoxInner className="flex space-x-2">
                <button onClick={handlePrevPage} disabled={params.page === 1}><PiIcons.PiCaretLeftBold /> </button> 
                <button onClick={handleNextPage}><PiIcons.PiCaretRightBold /> </button>

            </FlexBoxInner> */}
      </FlexBox>
    );
  };


  export default NotificationDashboard





     {/* <FlexBoxInner className='py-2 flex justify-between items-center space-x-4 border-b flex-grow '>
              <Text className='font-IBMPlexSans font-semibold flex-grow whitespace-nowrap px-5'>Notification</Text> 
              <FlexBoxInner className='pr-10 relative'>
                <IoNotificationsOutline size={25} />
                <div className='absolute -top-2 left-[20%] bg-red-600 rounded-full w-5 h-5 flex justify-center items-center'>
                  <Link to='request' className='font-IBMPlexSans font-semibold flex-grow whitespace-nowrap text-[10px] flex justify-center text-white'>ttt</Link> 
                </div>
              </FlexBoxInner>     
          </FlexBoxInner> */}