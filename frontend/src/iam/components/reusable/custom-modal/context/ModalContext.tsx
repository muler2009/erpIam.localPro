import React, {createContext, ReactNode, useState} from 'react'
import { ModalContextProps } from '../interface/modal'

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const ModalContextProvider = ({children}: {children: ReactNode}) => {

    const [modalType, setModalType] = useState<string | null>(null)
    const [modalData, setModalData] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    const openModal = (type: string, data: any) => {
        setModalType(type);
        setModalData(data);
        setIsModalOpen(true)
      };
    
      const closeModal = () => {
        setModalType(null);
        setModalData(null);
        setIsModalOpen(false)

      };

  return (
    <ModalContext.Provider value={{
        modalData,
        modalType,
        openModal,
        closeModal,
        isModalOpen,
    }}>
        {children}
    </ModalContext.Provider>
  )
}

export default ModalContext