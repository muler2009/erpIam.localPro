import React, {useState} from 'react'
import { FlexBox, FlexBoxInner, Div, Text, FlexInnerContainer, P } from '../../../../components/common/StyledComponent'
import { ModalBody, ModalContainer, ModalFooter, ModalWrapper, ModalHeader } from '../../../../iam/components/reusable'
import { Input } from '../../../../components/common'
import { ModalComponentPropsInterface } from '../../../models/common-models'
import * as VscIcons from 'react-icons/vsc'
import * as AiIcons from 'react-icons/ai'
import useFiles from '../../../hooks/useFiles'
import { BsFileEarmarkPdf } from "react-icons/bs";
import { useUploadDocumentMutation } from '../../../services/fileAPISlice'


const DocumentUploadModal = ({open, handleIsOpenCloseMenuModal, title}: ModalComponentPropsInterface) => {
  
  const { file, fileExtension, handleUploadedFile, fileSize, uploadProgress, uploading, uploadDocumentState } = useFiles()
  const [uploadDocument, {isError, error}] = useUploadDocumentMutation()

  const onUploadClicked = async() => {
    const formData = new FormData()
    if (uploadDocumentState?.file) {
      formData.append('current_version.uploaded_file', uploadDocumentState?.file);
    }

    try{
      const response = await uploadDocument(formData).unwrap()
      if (response.status_code === 201){
        handleIsOpenCloseMenuModal()
      }
    }catch(error){
      console.log(error)
    }

    console.log(`file uploaded: ${file?.name}`)
  }

  return (
    open ? (
      <ModalWrapper>
        <ModalContainer className={`w-[30%] mx-auto bg-[#fff] flex flex-col relative top-[5%] shadow-2xl rounded-md`}>
              <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px] bg-[#efefef] bg-opacity-50 font-Poppins rounded-md'>
                  <Text className='font-Poppins text-center pr-5 text-[#333] text-opacity-60 text-[13px]'>
                      {title}
                  </Text>

                  <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white" onClick={handleIsOpenCloseMenuModal} > 
                      <VscIcons.VscClose size={15} />
                  </div>
              </ModalHeader>
              <ModalBody className='p-5'>

                <FlexInnerContainer className='py-1 px-2'>
                  <Input 
                      // label='Folder Name'
                      id='parent_folder_input'
                      type='hidden'
                      name="parent_folder"
                      className='input-md'
                      placeholder='sadsad'
                      // value={folderAttributes.parent_folder || ""} 
                      
                  />
                  <FlexBox className="flex w-full max-w-xl text-center flex-col gap-1">
                    <FlexBoxInner className="flex w-full flex-col gap-2 rounded-md border border-dashed border-neutral-300 text-neutral-600">
                      <Div className="">
                        <label htmlFor="upload_file" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                          <input
                            id="upload_file"
                            type="file"
                            className="sr-only"
                            name='file'
                            onChange={handleUploadedFile}
                          />
                          
                          {
                            uploading ? (
                              <Div className="flex flex-col items-center justify-center w-full pt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                  <div className={`bg-blue-600 h-2.5 rounded-[3px] transition transition-width duration-200 ease-in-out`}  style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                                <P className="text-blue-600 text-sm font-medium"> Uploading file... {uploadProgress}%</P>
                            </Div>
                            ):(
                              <> 
                                {
                                  file ? (
                                    fileExtension === 'pdf' && (
                                        <FlexBoxInner className="flex justify-start space-x-3 ">
                                          <BsFileEarmarkPdf size={40} />
                                          <Div className='flex flex-col gap-1 items-start'>
                                            <P className="text-blue-600 text-sm font-medium">{file.name}</P>
                                            <small className="text-xs text-gray-500">File size: {fileSize?.toFixed(2)} KB</small>
                                          </Div>
                                        </FlexBoxInner>
                                    )): (
                                      <div className="flex flex-col items-center justify-center">
                                        <AiIcons.AiOutlineCloudUpload size={50} />
                                        <p className="mt-2 text-[12px]">Upload a document with valid format</p>
                                        <small id="validFileFormats">pdf, docx, xlsx, Max 5MB</small>
                                      </div>
                                    )
                                }
                              </>
                            )
                          }
                        </label>
                      </Div>
                    </FlexBoxInner>
                  </FlexBox>
                </FlexInnerContainer>
              </ModalBody>

              <ModalFooter className='flex justify-end pr-5 pt-3 pb-5 space-x-3'>
                  <button className='px-5 rounded-none text-sm   text-white btn-sm disabled:bg-gray-100 disabled:cursor-auto bg-[#3335a0]' onClick={onUploadClicked}>Upload</button> 
              </ModalFooter>

              <>
                {/* <ErrorNotifierModal 
                  triggerMessageModal={triggerMessageModal}
                  errorMessage= {errorMessage}
                  setTriggerMessageModal={setTriggerMessageModal}
                /> */}
              </>   
        </ModalContainer>
      </ModalWrapper>
    ): null   
  )
}

export default DocumentUploadModal





 {/* <div className='bg-gray-100 bg-opacity-50'>
                              {
                                  file &&  (                                    
                                      fileExtension === 'pdf' ? (
                                          <div className='font-Poppins text-sm flex'>
                                            <BsFileEarmarkPdf />
                                            <span className='text-blue-600 px-2'>{file.name}</span>
                                            {
                                              fileSize && <span>{fileSize.toFixed(2)}kb</span>
                                            }

                                          </div>
                                        ) : (
                                          <div className='px-5 font-Poppins text-sm'>no pdf:
                                          <span className='text-blue-600 px-2 underline'>{file.name}</span></div>
                                        )
                                      )                                    
                              }
                        </div> */}