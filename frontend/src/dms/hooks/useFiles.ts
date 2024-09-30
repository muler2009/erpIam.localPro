import React, {useState} from 'react'
import { DocumentUploadInterface } from '../models/document-models.';


const useFiles = () => {
  const [file, setFile] = useState<File | null>();
  const [fileExtension, seFileExtension]= useState<string | null>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const [uploadDocumentState, setUploadDocumentState] = useState<DocumentUploadInterface>({
    file: null as File | null,
    folder_name: ""

  })

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
    progress += 1;
    setUploadProgress(progress);
    if (progress === 100) {
        clearInterval(interval);
        setUploading(false); // Finish uploading
    }
    }, 200); // Adjust the interval to control the speed of the animation
}

  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = event.target;
    if(files && files.length > 0){
       const uploaded_file = files[0]
       setUploadDocumentState({
        ...uploadDocumentState,
        file: uploaded_file
       })

       const fileName = uploaded_file.name
       const extension = fileName.split('.').pop()?.toLocaleLowerCase() // get the file extension 
       seFileExtension(extension ?? null)

       const size = uploaded_file.size / 1024
       setFileSize(size)
       setUploading(true);
       simulateUpload();

    } else {
       setFile(null)
       seFileExtension(null)
    }
     // Simulate the upload process
  }


  return {
    file,
    fileExtension,
    fileSize,
    uploadDocumentState,
    uploadProgress,
    uploading,
    handleUploadedFile,
  }
}

export default useFiles