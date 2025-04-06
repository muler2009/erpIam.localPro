import { ErrorResponseInterface } from "../../models/error.model";
export interface ModalProps {
    children: React.ReactNode;
    className?: string;
}

export interface AccountLockedInterface {
    loginErrorMessage: ErrorResponseInterface | null;
    isLocked: boolean;
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>
    onUnlock?: () => void;
}