
export interface PolicyAPIInterface {
    policy_verison: number;
    policy_name: string;
    statements?: Statements[];
}

export interface Statements {
    effect: string;
    actions: PolicyActionInterface
}

export interface PolicyActionInterface {
    policy_action_name: string;
}

export interface PolicyColumnInterface extends PolicyAPIInterface {
    policy?: string;
}

export interface PolicyActionAPInterface {
    status_code: number;
    status_text: string;
    policy_data: PolicyActionInterface[]
}


export interface PolicyContextPropsInterface {
    policyData: PolicyAPIInterface;
    setPolicyData: React.Dispatch<React.SetStateAction<PolicyAPIInterface>>;
    canSave: boolean;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    policyCreationStep: { [key: number]: string };
    disableNext: boolean;
    disablePrev: boolean;
    prevHide?: string | boolean;
    nextHide: string | boolean;
    submitHide: string | boolean;
    canSubmit: boolean;
  }