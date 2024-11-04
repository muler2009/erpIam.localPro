import DelegationContext from "../views/delegation/context/DelegationContext";

export interface DelegationDataInterface { 
    delegator?: string;
    delegatee_user: string; 
    delegation_start_date?: string | null | undefined;
    delegation_end_date?: string | null | undefined;
    is_delegation_active?: boolean; 
    delegation_duration?: number;
}

export interface DelegationColumnInterface extends DelegationDataInterface {
    delegation_id: string;
}

export interface DelegationContextPropsInterface {
    delegationData: DelegationDataInterface;
    page: number;
    delegationStep: {[key: number]: string};
    disableNext: boolean;
    disablePrev: boolean;
    prevHide?: string | boolean;
    nextHide: string | boolean;
    submitHide: string | boolean;
    canSubmit: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    handleDateInputChange: (date: Date | null, inputDate: keyof DelegationDataInterface) => void
    setDelegationData: React.Dispatch<React.SetStateAction<DelegationDataInterface>>
    handleDelegationInputChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void

}
