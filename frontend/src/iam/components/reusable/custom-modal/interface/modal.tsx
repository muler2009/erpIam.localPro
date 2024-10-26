export interface ModalContextProps {
    openModal: (type : string, data: any) => void;
    closeModal: () => void;
    modalType: string | null;
    modalData: any
    isModalOpen: boolean
}