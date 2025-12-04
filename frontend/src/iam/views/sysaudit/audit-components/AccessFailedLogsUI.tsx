import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Input } from "../../../components/reusable";
import {
  useGetAccessFailureLogsQuery,
  useGetAccessBasedOnGroupQuery,
} from "../../../features/auditLogsAPI";

import * as BiIcons from "react-icons/bi";
import useUtils from "../../../../app/hooks/useUtils";
import useAccordion from "../../../../hooks/useAccordion";
import { isToday, parseISO, format } from "date-fns";
import FailedDetailComponentModal from "../auditl-modals/ListFailedDetailComponentModal";
import { AccessFailureLogsInterface, GroupedFailedAccessLog } from "../../../models/sys_audit_interface";
import * as PiIcons from "react-icons/pi";

const AccessFailedLogsUI = () => {
  const { data } = useGetAccessBasedOnGroupQuery();
  const failedGroupLogs = data || [];
  const {open, handleIsOpenCloseMenuModal} = useUtils()

  const { activeItems, accordionToggleHandler, isActive } = useAccordion<any>(
    failedGroupLogs.length > 0 ? [failedGroupLogs[0].date] : []
  );

  const [selectedLog, setSelectedLog] = useState<AccessFailureLogsInterface | null>(null)

  const handleOpenDetails = (logs: AccessFailureLogsInterface) => {
    setSelectedLog(logs);
    handleIsOpenCloseMenuModal()
  };

  const handleCloseModal = () => {
    handleIsOpenCloseMenuModal();
    setSelectedLog(null);
  };

  return (
    <div className={`flex flex-col space-y-2`}>
      <Input
        id="serech_input"
        type="text"
        name="search"
        className="px-5 py-[8px] text-[12px] rounded-full font-normal text-gray-700 bg-white border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:outline-none focus:bg-white "
        placeholder="Search here"
      />
      <div className={`pt-3 mt-3 px-5 w-[60%] h-full overflow-y-scroll flex flex-col cursor-pointer`}>
        {
          failedGroupLogs?.map((failedLogs, index) => {
            const apiDate = new Date(failedLogs?.date);
            const checkDateWithToday = isToday(apiDate) ? "Today" : format(apiDate, "EEE dd MMM yyyy"); // compare the apiDate with today 

          return (
            <>
            
            <div  key={index} className={`flex justify-between items-center py-4 px-5 rounded-md border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`} onClick={() => accordionToggleHandler(failedLogs.date)}>
              <div className={`flex space-x-2 px-3`} key={failedLogs.date} >
                { isActive(failedLogs.date) ? (PiIcons.PiCaretCircleDownFill({size: 20})) : (PiIcons.PiCaretCircleRightFill({size: 20})) }
                
                <div className={`font-Poppins text-[12px]`}>
                  {checkDateWithToday}
                </div>
              </div>
              <div className={`font-Poppins text-[12px] text-[#333] text-opacity-50`}>
                {failedLogs.logs.length || 0} Logs
              </div>
            </div>
            
              {
                isActive(failedLogs.date) && (
                  <div className={`py-2 ${failedLogs.logs.length > 3 ? "h-[300px] overflow-y-scroll" : "h-full"}`}>
                    {
                      failedLogs?.logs?.map((log, index) => (
                        <div key={index} className={`flex space-x-4 px-10 relative ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                        {/* Timeline indicator */}
                        <div className="flex flex-col items-center">
                          <div className={`w-5 h-5 bg-gray-100 rounded-full flex justify-center items-center`}>
                            <div className="w-2 h-2 rounded-full bg-blue-600 z-10" />
                          </div>
                            {index !== failedLogs.logs.length - 1 && (<div className="w-[2px] h-24 bg-gray-100 mt-1 rounded-full" /> )}
                        </div>

                        {/* Log content */}
                        <div className="text-[12px] text-gray-800 mt-[2px] font-medium"> 
                          {format(log.attempt_time, "hh:mm a")}
                        </div>
                        <div className={`flex-grow  my-1 `}>
                          <div className={`flex justify-between pt-4 px-5`}>
                            <div className={`flex flex-col space-y-2`}>
                              <div className={`text-[13px] flex space-x-2 items-center`}>
                                <span className={`font-semibold`}>
                                  {log.full_user_name !== null ? (
                                    log.full_user_name
                                  ) : (
                                    <h5>USER_NOT_FOUND</h5>
                                  )}
                                </span>
                                <span className={`text-[#333] text-opacity-50 text-[12px] `}>
                                  Authtenication failed due to
                                  <strong className={`text-red-600 pl-2`}>{log.failure_reason}</strong>
                                </span>
                              </div>
                              <div className={`pb-2`}>
                                <p className={`text-[#333] text-opacity-50 text-[12px]`}>
                                  Sorry, something went wrong while user is trying
                                  to login to the system
                                </p>
                              </div>
                            </div>
                            <div className="">
                              <h5 className={`text-red-600 font-Poppins font-semibold`}>failed</h5>
                            </div>
                          </div>
                          <div className={`flex justify-between items-center px-5 py-2 cursor-pointer`}>
                            <p className="text-[12px] text-green-700">Unresolved</p>
                            <button className="text-[12px] btn-sm px-3 bg-button-primary text-[#fff] flex justify-center items-center" onClick={() => handleOpenDetails(log)}>
                              {BiIcons.BiSolidUserDetail({size: 20})}
                              <span className="pl-1">Details</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
            </>
          );
        })
        }
      </div>
      
      {selectedLog && (
        <FailedDetailComponentModal
          open={open}
          handleIsOpenCloseMenuModal={handleCloseModal}
          title="Access Log Detail"
          data={selectedLog}  // Pass just one log instead of grouped
        />
      )}

    </div>
  );
};

export default AccessFailedLogsUI;
