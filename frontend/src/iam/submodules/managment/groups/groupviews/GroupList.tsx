import GroupTable from '../../../../components/Table/GroupTableUI'
import { useGetGroupsQuery } from '../../../../features/groupsAPI'
import useGroupColumn from '../../constants/columns/useGroupColumn'

const GroupList = () => {
    const { data, isSuccess, isLoading} = useGetGroupsQuery()
    const {columns} = useGroupColumn()
    console.log(data)
  return (
    <div>  
        {isLoading && <p>please wait it is loading ...</p>}
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
    </div>
  )
}

export default GroupList
