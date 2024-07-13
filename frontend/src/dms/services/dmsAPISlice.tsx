import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../config/config";
import { FolderDataInterface } from "../models/folder-models";

export const dmsAPISlice = createApi({
    reducerPath: "dmsAPISlice",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        getFolder: builder.query<FolderDataInterface[], void>({
            query: () => ({
                url: `dms/folder/get`,
                method: `GET`
            })
        })
    })
})


export const {
    useGetFolderQuery
} = dmsAPISlice

export default dmsAPISlice