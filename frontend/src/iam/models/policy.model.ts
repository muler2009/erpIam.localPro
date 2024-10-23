
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
    policy_action_name?: string;
}

export interface PolicyColumnInterface extends PolicyAPIinterface {
    policy_oromia_id?: string;
}

export interface PolicyActionAPInterface {
    status_code: number;
    status_text: string;
    policy_data: PolicyActionInterface[]
}


export interface PolicyDataInterface extends PolicyActionInterface{
    policy_name: string; 
    policy_description: string;  
    policy_version: string; 
    statements: Statement[];
    is_app_level: boolean;
    is_model_level: boolean;  
}


export interface Statement {
  effect: 'allow' | 'deny';  // Limit effect to "allow" or "deny"
  action: string[];  // An array of actions (e.g., ["ListAccount", "WriteAccount"])
  resource: string[];  // An array of resources (e.g., ["X", "Y"])
}

// interface for an API response 
export interface PolicyAPIinterface extends PolicyDataInterface {
    policy_ormomia_id: string;
    status_code: number;
    status_text: string;
    message: string;
    error_type: string;
}

// context type for policy creation
export interface PolicyContextPropsInterface {
    policyData: PolicyDataInterface;
    canSave: boolean;
    page: number;
    policyCreationStep: { [key: number]: string };
    disableNext: boolean;
    disablePrev: boolean;
    prevHide?: string | boolean;
    nextHide: string | boolean;
    submitHide: string | boolean;
    canSubmit: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPolicyData: React.Dispatch<React.SetStateAction<PolicyDataInterface>>;
    handlePolicyInputFieldChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    handleCheckboxChange: (action: string) => void

}

// project model reterival interface
export interface ProjectModelAPIinterface extends ProjectModelInterface {
    app_name: string;
    models: ProjectModelAPIinterface[]
}

export interface ProjectModelInterface {
    model_name: string;
    display_name: string;
}
