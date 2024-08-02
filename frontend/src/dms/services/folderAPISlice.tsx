import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_TAGS, BASE_URL } from "../../config/config";
import { FolderAPIResponseInterface, FolderCreateInterface, FolderDataInterface } from "../models/folder-models";
import { erpAPISlice } from "../../iam/api/apiSlice";

export const dmsAPI = erpAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getFolder: builder.query<FolderDataInterface[], void>({
            query: () => ({
                url: `dms/folder/get_folder/`,
                method: `GET`
            }),
            providesTags: [API_TAGS.FOLDERS]
        }),
        createFolder: builder.mutation<FolderAPIResponseInterface, FolderCreateInterface>({
            query: (folderAttributes) => ({
                url: `dms/folder/create_folder/`,
                method: `POST`,
                body: folderAttributes
            }),
            invalidatesTags: [API_TAGS.FOLDERS]
        })
    })
})


export const {
    useGetFolderQuery,
    useCreateFolderMutation
} = dmsAPI




