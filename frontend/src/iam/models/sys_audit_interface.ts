
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