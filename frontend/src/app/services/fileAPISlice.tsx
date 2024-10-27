import { API_TAGS } from "../../config/config";
import { erpAPISlice } from "../../iam/api/apiSlice";
import { UploadedDocumentInterface } from "../models/folder-models";
import { DocumentAPIInterface, DocumentInterface } from "../models/document-models.";

export const fileAPI = erpAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFiles: builder.query<UploadedDocumentInterface[], void>({
        query: () => ({
            url: `dms/file/get_all_files/`,
            method: `GET`,

        }),
        providesTags: [API_TAGS.FILES]
    }),
    // api endpoint for uploading a file 
    getDocument: builder.query<DocumentAPIInterface[], void>({
      query: () => ({
          url: `dms/repository/get/`,
          method: `GET`,
      }),
      providesTags: [API_TAGS.FILES]
    }),
    // api endpoint for uploading a file 
    uploadDocument: builder.mutation<DocumentAPIInterface, FormData>({
      query: (formData) => ({
          url: `dms/repository/upload_document/`,
          method: `POST`,
          body: formData, 
      }),
      invalidatesTags: [API_TAGS.FILES]
    }),

  }),


})


export const {
     useGetAllFilesQuery,
     useGetDocumentQuery,
     useUploadDocumentMutation,
} = fileAPI



