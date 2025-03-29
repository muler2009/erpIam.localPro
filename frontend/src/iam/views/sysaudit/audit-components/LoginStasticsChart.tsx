import React from 'react'
import { useGetLoginChartStasticsQuery } from '../../../features/auditLogsAPI'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const LoginStasticsChart = () => {
    const { data: stasticsData } = useGetLoginChartStasticsQuery()
    // console.log(data)

    const chartData = stasticsData ? stasticsData?.map((dataChart: {date: string, logins: number }) => (
      {
        date: new Date(dataChart.date).toLocaleDateString("en-Us", {month: "short", day: "2-digit"}),
        logins: dataChart.logins
      }
    )) : []


  return (
    <div className='w-1/2'>
    
      <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <defs>
          <linearGradient id="color" x1={0} y1={0} x2={0} y2={1}>
            <stop offset={`0%`} stopColor="#245187" stopOpacity={0.4} />
            <stop offset={`75%`} stopColor="#245187" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Line
          dataKey="logins" // Corrected: Use the y-axis data key
          stroke="#245187"
          fill="url(#color)"
        />
        <XAxis
          dataKey="date" // X-axis data key
          tickLine={false}
          axisLine={false}
          fontFamily="Poppins"
          fontSize={12}
          tick={{ style: { paddingTop: '20px' } }} // Add padding below the axis line
          tickFormatter={(value) => `${value}`} // Customize the tick labels
          tickMargin={10}          
        />
        <YAxis
          dataKey={`logins`} // Y-axis data key
          axisLine={false}
          tickLine={false}
          tickCount={4}
          tickFormatter={(number) => `${number} times`}
          fontFamily="Poppins"
          fontSize={10}
          allowDataOverflow={false} 
          domain={['auto', 'auto']} // Automatically adjust the y-axis range
          tickMargin={10}
        />
       <Tooltip
          content={({ payload, label }) => (
            <div className="bg-white p-2 border border-gray-200 rounded shadow font-Poppins text-[#333] text-opacity-80">
              <p className="font-semibold">{label}</p>
              <p>Sales: {payload?.[0]?.value} ETB</p>
            </div>
          )}
        />
        <CartesianGrid opacity={0.3} vertical={false} />
      </LineChart>


      </ResponsiveContainer>

    </div>
  )
}

export default LoginStasticsChart