export interface NotificationTemplateInterface {
    eventType_name: string;
    default_channel: string;
    subject: string;
    default_message: string;
}

export interface NotificationAPITemplateInterface extends NotificationTemplateInterface {
    eventType_id: string;
}