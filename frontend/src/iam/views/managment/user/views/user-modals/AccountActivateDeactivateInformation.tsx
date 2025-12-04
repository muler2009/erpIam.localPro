import React from 'react'
import { Div, Text } from '../../../../../../components/common/StyledComponent'
import { UserAccountInterfacee } from '../../../../../models/user.model'
import { RiUserForbidFill } from "react-icons/ri";
import { useToggelActivationAndDeactivationMutation } from '../../../../../features/userAPI';
import useDeactivationActivation from '../../../../../hooks/useDeactivationActivation';
import { toast, ToastContainer } from 'react-toastify';

interface AccountActivateDeactivateInformationInterface {
    userData: any,
    handleIsOpenCloseMenuModal: () => void;
}

const AccountActivateDeactivateInformation = ({userData, handleIsOpenCloseMenuModal }: AccountActivateDeactivateInformationInterface) => {

    const [toggelActivationAndDeactivation] = useToggelActivationAndDeactivationMutation()
    const onActivateDeactivateButtonClicked = async(id: string) => {
        try{
            const response = await toggelActivationAndDeactivation(id).unwrap()
            if (response.status_code === 201) {
                setTimeout(() => {
                    handleIsOpenCloseMenuModal(); // Close the modal after the toast is triggered
                }, 2000); // Adjust the delay as needed
            } else {
                toast.error("Unexpected status code received.");
            }
        }catch(error){
            console.log("Something went wrong")
        }
    }

  return (
    userData?.map((user: any, index: any) => {
        return (
            <>
                <Div key={index} 
                    className={`flex items-center space-x-10 px-4 hover:bg-gray-50 ${userData.length - 1 === index ? 'border-none' : 'border-b'} ${!user.is_active && 'bg-slate-200 bg-opacity-50 text-black hover:bg-slate-200'} `}>
                    <Div className="flex space-x-8">
                        <Text>{index + 1}</Text>
                        <Text>{user.userId}</Text>
                        <Text className='w-[50px]'>
                            {
                                user.is_active ? (
                                    <Text className='text-green-600'>active</Text>
                                ) : (
                                    RiUserForbidFill({})
                                )
                            }
                        </Text>
                        
                    </Div>
                    <Div className='flex-grow'>
                        <div className='flex justify-between items-center'>
                            <Text>{user.first_name} {user.last_name}</Text>
                            <div className='flex space-x-1 justify-center py-2'>
                                {
                                    !user.is_active && (
                                        <button
                                            className={`btn-sm text-white px-4 text-[12px] ${user.is_active ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-green-600 bg-green-500'}`}
                                            disabled={user.is_active}
                                            onClick={() => onActivateDeactivateButtonClicked(user.user_account_id)}
                                        >
                                            Activate
                                        </button>

                                    )
                                }

                                {
                                    user.is_active && (
                                        <button
                                            className={`btn-sm text-white px-4 text-[12px] ${!user.is_active ? 'bg-gray-100 invisible' : 'hover:bg-red-600 bg-red-500'}`}
                                            disabled={!user.is_active}
                                            onClick={() => onActivateDeactivateButtonClicked(user.user_account_id)}

                                        >
                                            Deactivate
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </Div>
                </Div>
            </>
        );
    })
  )
}

export default AccountActivateDeactivateInformation