import { API_TAGS } from "../../config/config";
import { erpAPISlice } from "../../iam/api/apiSlice";
import { UploadedDocumentInterface } from "../models/folder-models";

export const fileAPI = erpAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFiles: builder.query<UploadedDocumentInterface[], void>({
        query: () => ({
            url: `dms/file/get_all_files/`,
            method: `GET`,

        }),
        providesTags: [API_TAGS.FILES]
    }),

  }),


})


export const {
     useGetAllFilesQuery
} = fileAPI



