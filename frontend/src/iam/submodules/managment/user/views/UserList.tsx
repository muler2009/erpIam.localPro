import { useGetAllUsersQuery } from '../../../../features/userAPI'
import UserTable from '../../../../components/Table/UserTable'
import useUserColumn from '../../constants/columns/useUserColumn'


const UserList = () => {    
 const {data, isLoading, isError, isSuccess} = useGetAllUsersQuery()
 const { userColumns } = useUserColumn()
    
return (
    <div>  
      {/* <Search /> */}
      {isLoading && <p>please wait it is loading ...</p>}
      {
          isSuccess ? (
              data?.length > 0 ? (
              <div>
                  <UserTable 
                      columns={userColumns}
                      data={data || []}                        
                  />
              </div>
              
              ) : (
                  <div className='flex flex-col'>
                      <UserTable 
                      columns={userColumns}
                      data={data || []}                                          
                  />
                      <p className='text-black text-center text-[18px] text-opacity-50'>No User Registered available.</p>                      
                  </div>
              )
          ) : null
      }
    
  </div>
)
}


export default UserList
