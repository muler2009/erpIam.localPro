import { RequestDataInterface } from "./request-model";

export interface ModalComponentPropsInterface {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    title: string;   
}

export interface TabComponentPropsInterface {
    icon?: React.ReactElement;
    tabContent: React.ReactElement;
    label: string;
    totalValues?: number;
    total?: boolean;
}

export interface DocumentPropsInterface extends ModalComponentPropsInterface {
    open: boolean;
    handleIsOpenCloseMenuModal: () => void;
    title: string;
    rowMetaData: RequestDataInterface
}

export interface APIResponseInterface {
    status_code: number;
    status_text?: string;
    message?: string;
    error_type?: string
}