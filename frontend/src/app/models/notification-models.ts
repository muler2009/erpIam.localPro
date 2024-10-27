
export interface TabMenuInterface {
    icon?: React.ReactElement;
    tabContent: React.ReactElement;
    label: string;
    notification?: number;
    total?: boolean;
}
export interface NotificationInterface {
    notification_recepient?: string; 
    notification_message: string;
    notification_read: boolean;
    notification_recieved_at?: string; 
    notification_metadata: Record<string, any>;
    notification_type: string;
    current_state?: string;
}
export interface NotificationAPIResponse extends NotificationInterface {
    notification_id: string;
}


interface NotificationsResponse {
    notifications: NotificationInterface[];
    total_unread: number;
    user: {
      username: string;
      email: string;
    };
  }

export interface NotificationItemProps {
  notification: NotificationAPIResponse;
  unreadCount: number | undefined
}