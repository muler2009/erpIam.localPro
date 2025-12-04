import React from 'react'
import * as FaIcons from "react-icons/fa6";
import * as GrIcons from "react-icons/gr";
import * as PiIcons from "react-icons/pi";
import { Text } from '../../../components/reusable/StyledComponent';

const IAMUserResourceCard = ({totalUser}: {totalUser: number}) => {
  return (
    <div className={`bg-white py-5 px-3 border`}>
        <div className={`flex justify-between items-center`}>
            <div className={`flex items-center space-x-2`}>
                <div className={`w-10 h-12 bg-red-100 flex justify-center items-center text-opacity-50`}>
                    {
                        PiIcons.PiUsersFill({
                            size: 25, 
                            opacity: 0.65
                        }) 
                    }
                    
                </div>
                <div className={``}>
                    <Text className={`text-[15px] font-Poppins font-normal text-[#333] text-opacity-60`}>Total Users
                        <span className={` block font-IBMPlexSans font-semibold text-[25px] text-black -mt-2`}>{totalUser}</span>
                    </Text>
                </div>
            </div>
            <div className={`flex items-end justify-end space-x-2 `}>
                {/* <div className={`w-10 h-12 bg-green-100 flex justify-center items-center text-opacity-50`}>
                    <GrIcons.GrStatusGood size={25} opacity={0.5} />
                </div> */}
                <div className={``}>
                    <Text className={`flex text-[11px] font-Poppins font-normal text-[#333] text-opacity-60 bg-green-100 px-4`}>
                        {
                            GrIcons.GrStatusGood({
                                size: 25, 
                                opacity: 0.5,
                                className: 'pr-1'

                            }) 
                        }
                        active users
                    </Text>
                    <span className={`font-IBMPlexSans font-semibold text-[20px] text-green-500 pl-2 float-right`}>{totalUser}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IAMUserResourceCard