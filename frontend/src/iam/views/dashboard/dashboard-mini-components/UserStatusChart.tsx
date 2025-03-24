import React from 'react'
import { ResponsiveContainer, XAxis, YAxis, BarChart, Bar, CartesianGrid, Tooltip, Rectangle } from 'recharts'

const data = [
  {
    name: "name",
    uv: 200,
 
  },
  {
    name: "name",
    uv: 200,
  
  }
]

const UserStatusChart = ({className}: {className: string}) => {
  return (
    <ResponsiveContainer width="100%" height={150}>
    <BarChart
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      barCategoryGap="2%"  // Extremely tight
      barGap={0}           // No internal gaps
    >
      <defs>
        <linearGradient id="color" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#32CD32" stopOpacity={0.4} />
          <stop offset="75%" stopColor="#32CD32" stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <Bar 
        dataKey="uv" 
        fill='green' 
        barSize={14}    // Make it thinner if needed
        activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
      <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={15} fontFamily="Poppins" fontSize={12} />
      <YAxis axisLine={false} tickLine={false} tickMargin={15} tickCount={4} fontFamily="Poppins" fontSize={12} />
      {/* <Tooltip /> */}
      <CartesianGrid opacity={0.3} vertical={false} />
    </BarChart>
  </ResponsiveContainer>
  )
}

export default UserStatusChart