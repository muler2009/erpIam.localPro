import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent';


const data = [
    {
      name: 'Folder',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Files',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Shared Document',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Proposal',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Approved Docuement',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    }
  ];

const DashboardChart = () => {


  const chart = (interval: any) => (
    <ResponsiveContainer height={250} width={800} className={`text-[12px] `}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" axisLine={false} />
        <YAxis interval={interval} axisLine={false} />
        <Line type="monotone" dataKey="pv" stroke="#000" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#26cc86" />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <FlexBox className='my-2 bg-white pl-5 pr-3 py-10 flex space-x-2 '>
        <FlexBoxInner className='flex flex-col'>
            <Text className='font-semibold pb-5'>System Record Summary</Text>
            {chart('preserveEnd')}
        </FlexBoxInner>
        <FlexBoxInner className='bg-[#26cc86] flex-grow mb-5 rounded-md'>
            <FlexBox className='flex flex-col items-center pt-10'>
                <Text className='text-[16px] text-white'>Total</Text>
                <Text className='font-semibold text-[35px] text-white'>1200</Text>

            </FlexBox>
        </FlexBoxInner>
    </FlexBox>
      
  );
};


export default DashboardChart;