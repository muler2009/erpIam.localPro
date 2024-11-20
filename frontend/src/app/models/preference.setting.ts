export interface NotificationPreferenceSettingInterface {
    template?: string;
    preffered_channel: string;
    enabled: boolean;
}

export interface NotificationPreferenceSettingAPI extends NotificationPreferenceSettingInterface {
    preference_id: string;
}