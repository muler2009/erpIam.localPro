
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
    notification_received_at?: string; 
    notification_metadata: Record<string, any>;
    notification_type: string;
    notification_sender: string;
    subject?: string;
    current_state?: string;
}
export interface NotificationAPIResponse extends NotificationInterface {
    notification_id: string;
}

export interface NotificationColumn extends NotificationInterface {
  notification_id: string;
}


export interface NotificationsResponse extends NotificationInterface {
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

