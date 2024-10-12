
export interface PolicyAPIInterface {
    
    policy_verison: string;
    policy_name: string;
    statements: Statements[];
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