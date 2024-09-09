import { RequestDataInterface } from "./request-model";

export interface ModalComponentPropsInterface {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    title: string;
    
}

export interface DocumentPropsInterface extends ModalComponentPropsInterface {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    title: string;
    rowMetaData: RequestDataInterface
}