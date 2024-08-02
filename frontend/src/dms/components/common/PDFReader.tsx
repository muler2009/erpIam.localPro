import React, {useState} from 'react'
import { Document, Page, pdfjs } from 'react-pdf'; 
import { ModalBody, ModalContainer, ModalHeader, ModalWrapper } from '../../../iam/components/reusable';
import * as Vsc from 'react-icons/vsc'
import * as MdIcons from 'react-icons/md'
import * as Io5Icons from "react-icons/io5";
import * as GoIcons from "react-icons/go";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import { FlexBox, FlexBoxInner, FlexInnerContainer } from '../../../components/common/StyledComponent';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

  interface PdfReaderInterface {
    pdfURL: string,
    openPdfs: boolean;
    setOpenPdfs: React.Dispatch<React.SetStateAction<boolean>>,
    title?: string
  }

const PdfReader = ({pdfURL, openPdfs, setOpenPdfs, title}: PdfReaderInterface) => {

  const [zoom, setZoom] = useState(1)
  const [pdfClose, setPdfClose] = useState(false)

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number | undefined }): void => {
    setNumPages(numPages);
    setPageNumber(1);
  }
 
    return(
        openPdfs ? (
            <ModalWrapper>
                <ModalContainer className={`w-[60%] h-[95vh] bg-black bg-opacity-80 mx-auto flex flex-col relative top-0 shadow-2xl overflow-scroll`}>
                    <ModalHeader className='flex justify-start items-center px-5 border-b-[1px] bg-[#333] sticky top-0 z-10'>
                        <FlexInnerContainer className='text-[#fff]'>
                            <MdIcons.MdMenu size={18} />
                        </FlexInnerContainer>
                        <FlexInnerContainer className='flex-grow'>
                            <FlexBox className='flex justify-center space-x-2 items-center text-[#fff] text-[13px] divide-x-[1px] divide-[#fff] divide-opacity-50'>
                                <FlexInnerContainer className='flex space-x-2 items-center'>
                                    <button className='disabled:bg-gray' disabled={pageNumber <= 1} onClick={() => setPageNumber(prevPageNumber => prevPageNumber - 1)} >
                                        <Io5Icons.IoChevronBack size={15}  />
                                    </button>
                                    <p>{pageNumber || (numPages ? 1 : '')} - {numPages || ''}</p>
                                    <button className='disabled:bg-gray'  disabled={numPages === undefined || pageNumber >= numPages}  onClick={() => setPageNumber(prevPageNumber => prevPageNumber + 1)} >
                                        <Io5Icons.IoChevronForward  size={15}  />
                                    </button>
                                </FlexInnerContainer>
                                <FlexBoxInner className='pl-2 flex items-center space-x-3'>
                                    <button onClick={() => setZoom(prevScale => prevScale - 0.25)}><GoIcons.GoZoomOut size={15} /></button>
                                    <h1 className='border border-[#fff] border-opacity-50 px-2'>{zoom * 100} <span>%</span></h1>
                                    <button onClick={() => setZoom(prevScale => prevScale + 0.25)}><GoIcons.GoZoomIn size={15} /></button>
                                </FlexBoxInner>
                            </FlexBox>
                        </FlexInnerContainer>

                        <div className='flex space-x-5 text-[#fff] cursor-pointer'>
                            <IoIcons.IoMdDownload size={16} />
                            <IoIcons.IoIosPrint size={16} />
                            <Vsc.VscClose size={16} onClick={() => setOpenPdfs(prevState => !prevState)} />
                        </div>
                    </ModalHeader>
                    <ModalBody className='py-2 flex justify-center items-center'>
                        <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} renderAnnotationLayer={false} renderTextLayer={false} scale={zoom}/>
                        </Document>
                    </ModalBody>
                </ModalContainer>
            </ModalWrapper>
        ) : null
    )
}

export default PdfReader