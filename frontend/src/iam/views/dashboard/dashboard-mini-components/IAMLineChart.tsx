import React from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import DashboardChart from './DashboardChart';

const data = [
  {
    name: 'Users',
    uv: 3,
  },
  {
    name: 'Roles',
    uv: 4,
   
  },
  {
    name: 'Group',
    uv: 3.5,
   
  },
  {
    name: 'Policy',
    uv: 4.5,
  }
];


const IAMLineChart = () => {
  return (
    <div className='border rounded-[5px] px-2 py-4'>
        <ResponsiveContainer width="100%" height={200} > 
            <LineChart data={data}>
                  <defs>
                    <linearGradient id="color" x1={0} y1={0} x2={0} y2={1}>
                      <stop offset={`0%`} stopColor="#32CD32" stopOpacity={0.4} />
                      <stop offset={`75%`} stopColor="#32CD32" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Line dataKey="uv" fill="#000" strokeMiterlimit="2" />
                  <XAxis dataKey="name" axisLine={false}  tickLine={false} tickMargin={15} fontFamily='Poppins' fontSize={12}/>
                  <YAxis dataKey="uv" axisLine={false} tickLine={false} tickMargin={15} tickCount={4} fontFamily='Poppins' fontSize={12} />
                  <Tooltip />
                <CartesianGrid opacity={0.3} vertical={false} />
            </LineChart>
        </ResponsiveContainer>
       
        
    </div>
  )
}

export default IAMLineChart