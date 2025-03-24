import React from 'react'

const IAMPolicyGroupCard = () => {
  return (
    <div className=" flex flex-col space-y-2 px-3 py-2">
    <div className="flex-grow border-b">
      <div className="flex flex-col space-y-1">
        <p className="text-[#69b2f8] text-sm font-Poppins uppercase font-semibold text-opacity-95">Group</p>
        <h1 className="font-IBMPlexSans text-black text-xl ">5</h1>
        <p className="text-[#333] text-[11px] font-Poppins text-opacity-50 text-nowrap">Total sold quantity from the current stock</p>
      </div>
    </div>
    <div className="flex-grow">
      <div className="flex flex-col space-y-1">
        <p className="text-[#69b2f8] text-sm font-Poppins uppercase font-semibold text-opacity-95">Policy Created</p>
        <h1 className="text-green-500 text-xl font-IBMPlexSans">8</h1>
        <p className="text-[#333] text-[11px] font-Poppins text-opacity-50 whitespace-nowrap">Custom policies created by admin for the user</p>
      </div>
    </div>
  </div>
  )
}

export default IAMPolicyGroupCard