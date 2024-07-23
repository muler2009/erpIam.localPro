import { FlexBox, FlexBoxInner } from '../../../../components/reusable/StyledComponent'
import GroupTable from '../../../../components/Table/GroupTableUI'
import { useGetGroupsQuery } from '../../../../features/groupsAPI'
import useGroupColumn from '../../constants/columns/useGroupColumn'
import GroupChart from './GroupChart'

const GroupList = () => {
    const { data, isSuccess, isLoading} = useGetGroupsQuery()
    const {columns} = useGroupColumn()
    console.log(data)
  return (
    <FlexBox className='flex space-x-2'>
        <FlexBoxInner className='flex-grow'>
            {
                isSuccess ? (
                    data?.length > 0 ? (
                    <div>
                        <GroupTable 
                            columns={columns}
                            data={data || []}                        
                        />
                    </div>
                    
                    ) : (
                        <div className='flex flex-col'>
                            <GroupTable 
                            columns={columns}
                            data={data || []}                                          
                        />
                            <p className='text-black text-center text-[18px] text-opacity-50'>No Group available.</p>                      
                        </div>
                    )
                ) : null
            }

        </FlexBoxInner>
        {isLoading && <p>please wait it is loading ...</p>}
        <FlexBoxInner className='flex justify-end'>
            <GroupChart />
        </FlexBoxInner>        
    </FlexBox>  
  
  )
}

export default GroupList
