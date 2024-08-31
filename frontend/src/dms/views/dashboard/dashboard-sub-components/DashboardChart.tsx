import React from 'react';
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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
      name: 'Shared',
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
      name: 'Approved ',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    }
  ];


const DashboardChart = () => {
  const chart = (interval: any) => (
    <ResponsiveContainer height={250} width={600} className={`text-[11px] `}>   
        <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5, }} barCategoryGap={2} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" axisLine={false} />
          <YAxis interval={interval} axisLine={false} />
          <Bar dataKey="pv" fill="#26cc86" barSize={30}  />
        </BarChart>
    </ResponsiveContainer>
  );

  return (
    <FlexBox className=' bg-white flex space-x-2 rounded-[5px]'>
        <FlexBoxInner className='flex flex-col border py-5 px-4'>
            <Text className='font-semibold pb-5'>System Record Summary</Text>
            {chart('preserveEnd')}
        </FlexBoxInner>
    </FlexBox>
  );
};


export default DashboardChart;




 {/* <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" axisLine={false} />
        <YAxis interval={interval} axisLine={false} />
        <Line type="monotone" dataKey="pv" stroke="#000" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#26cc86" />
      </LineChart> */}