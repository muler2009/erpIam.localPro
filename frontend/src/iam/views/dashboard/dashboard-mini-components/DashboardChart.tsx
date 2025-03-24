import React from 'react'
import { Text } from '../../../components/reusable/StyledComponent'
import { AreaChart, ResponsiveContainer, Area, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'
import {format, parseISO, subDays} from 'date-fns'


const data = [
  {
    name: 'January',
    uv: 2500,

  },
  {
    name: 'Feb',
    uv: 2700,
  },
  {
    name: 'Mar',
    uv: 2450,
  },
  {
    name: 'April',
    uv: 2780,
  },
  {
    name: 'May',
    uv: 2200,
  },
  {
    name: 'June',
    uv: 2300,
  },
 
];

const DashboardChart = () => {
  return (
    <div className={`bg-white flex flex-col border rounded-md py-2 px-2 w-full`}>
      <div className={`flex justify-between items-center`}>
        <div className='px-3 py-2'>
          <Text className='font-Poppins font-semibold text-text-primary text-opacity-50 pb-1'>System Usage</Text>

        </div>
        <div className={`flex space-x-2`}>
          {/* <Text>sdasdsdsdad</Text> */}
        </div>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={265} >
              <AreaChart data={data}>
                  <defs>
                    <linearGradient id="color" x1={0} y1={0} x2={0} y2={1}>
                      <stop offset={`0%`} stopColor="#32CD32" stopOpacity={0.5} />
                      <stop offset={`80%`} stopColor="#32CD32" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                    <Area
                      dataKey="uv" // Corrected: Use the y-axis data key
                      stroke="#32CD32"
                      fill="url(#color)"
                      // type="monotone"
                    />
                    <XAxis
                      dataKey="name" // X-axis data key
                      scale="point"
                      tickLine={false}
                      axisLine={false}
                      fontFamily="Poppins"
                      fontSize={12}
                      tick={{ style: { paddingTop: '20px' } }} // Add padding below the axis line              
                      tickMargin={15}
                    />
                    <YAxis
                      dataKey={`uv`} // Y-axis data key
                      axisLine={false}
                      tickLine={false}
                      tickCount={5}
                      fontFamily="Poppins"
                      fontSize={10}
                      allowDataOverflow={false} 
                      domain={['auto', 'auto']} // Automatically adjust the y-axis range
                      tickMargin={15}
                    />
                    <Tooltip
                      // content={({ payload, label }) => (
                      //   <div className="bg-white p-2 border border-gray-200 rounded shadow font-Poppins text-[#333] text-opacity-80">
                      //     <p className="font-semibold">{label}</p>
                      //     <p>Sales: {payload?.[0]?.value}</p>
                      //   </div>
                      // )}
                    />
                  <CartesianGrid opacity={0.3} vertical={false} />
          
              </AreaChart>       
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DashboardChart