import React from 'react'
import * as PiIcons from "react-icons/pi";
import * as GrIcons from "react-icons/gr";

import { Text } from '../../../components/reusable/StyledComponent';

const IAMRolesCard = ({totalRoles}: {totalRoles: number}) => {
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
                     <Text className={`text-[15px] font-Poppins font-normal text-[#333] text-opacity-60`}>User role
                         <span className={` block font-IBMPlexSans font-semibold text-[25px] text-black -mt-2`}>{totalRoles}</span>
                     </Text>
                 </div>
             </div>
            
         </div>
     </div>
   )
}

export default IAMRolesCard