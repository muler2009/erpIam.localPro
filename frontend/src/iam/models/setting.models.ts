export interface NotificationTemplateInterface {
    template_name: string;
    template_channel: string;
    subject: string;
    notification_message: string;
}

export interface NotificationAPITemplateInterface extends NotificationTemplateInterface {
    template_id: string;
}