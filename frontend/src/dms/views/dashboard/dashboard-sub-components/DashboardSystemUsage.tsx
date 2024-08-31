import React from 'react';
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent';
import { AreaChart, Area, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
      name: 'Meskerem',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Tikimit',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Hidar',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Tahisas',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];


const DashboardSystemUsage = () => {
  const chart = (interval: any) => (
    <ResponsiveContainer height={200} width='100%' className={`text-[11px] `}>
        <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" axisLine={false} />
           
            <Tooltip />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <FlexBox className=' bg-white rounded-[5px] w-full'>
        <FlexBoxInner className='flex flex-col border py-5 px-4'>
            <Text className='font-semibold pb-5'>System Usage</Text>
            {chart('preserveEnd')}
        </FlexBoxInner>
    </FlexBox>
  );
};


export default DashboardSystemUsage