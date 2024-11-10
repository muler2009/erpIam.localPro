import { erpAPISlice } from "../api/apiSlice"
import { API_TAGS } from "../../config/config"
import { NotificationAPITemplateInterface, NotificationTemplateInterface } from "../models/setting.models"
import { APIResponseInterface } from "../../app/models/common-models"

export const settingAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotificationTemplate: builder.query<NotificationAPITemplateInterface[], void>({
            query: () => ({
                url: `/notification/template/`,
                method: 'GET'
            }),
            providesTags: [API_TAGS.SETTING]
        }),
        createNotificationTemplate: builder.mutation<APIResponseInterface, NotificationTemplateInterface>({
            query: (data) => ({
                url: `notification/new_template/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [API_TAGS.SETTING]
            
        })
    })
})


export const {
    useGetNotificationTemplateQuery,
    useCreateNotificationTemplateMutation
} = settingAPI