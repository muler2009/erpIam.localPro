import { ModalComponentPropsInterface } from "./common-models";

export interface LoginEventAuditLogInterface {
    login_type: number;
    username: string;
    datetime: string;
    remote_ip: string;
    user_id?: string;
    full_name?: string;
}

export interface LoginEventAuditLogAPIInterface extends LoginEventAuditLogInterface{
    status_code: number;
    message: string;
    error_type: string;
}

export interface UserLogInfo {
    user_id: string; // UUID
    username: string;
    email: string;
    is_superuser: boolean;
}

export interface EventInterface {
    type: "login_failure" | "login_success" | string;
    status: "failed" | "success" | string;
    reason?: string; // e.g., "wrong_password", "account_locked", etc.
  }

export interface RiskInterface {
    device_fingerprint?: string;
    is_new_device?: boolean;
    login_risk_score?: number;
    login_anomaly_detected?: boolean;
    was_challenge_triggered?: boolean;
  }

export interface AccessFailureLogsInterface {
    user_agent: string
    attempt_time: string;
    ip_address: string;
    username: string;
    failure_count: number;
    failure_reason: string;
    http_accept: string;
    locked_out: boolean;
    logout_time?: string | Date;
    session_hash?: string;
    user_info: UserLogInfo;
    event: EventInterface;
    risk: RiskInterface;    
    full_user_name: string;
    remaining_seconds: number;
    unlock_time: string;
    failures_since_start: number;
}

export interface APIResponseInterface extends AccessFailureLogsInterface {
    status_code?: number;
    message?: string;
    error_type?: string;
}

export interface GroupedFailedAccessLog {
    date: string; 
    logs: AccessFailureLogsInterface[];
}

// This is the combined union type
export type AccessFailureLogsAPIResponse =
  | AccessFailureLogsInterface[] // success
  | APIResponseInterface; // no data / error

export interface FailedDetailComponentModalInterfacce extends ModalComponentPropsInterface {
    data: AccessFailureLogsInterface
}