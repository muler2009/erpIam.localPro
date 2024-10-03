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
    title?: string
  }

const PDFInlineReader = ({pdfURL, title}: PdfReaderInterface) => {

  const [zoom, setZoom] = useState(1)
  const [pdfClose, setPdfClose] = useState(false)

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number | undefined }): void => {
    setNumPages(numPages);
    setPageNumber(1);
  }
 
    return(
        <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
            {/* <Page pageNumber={pageNumber} renderAnnotationLayer={false} renderTextLayer={false} scale={zoom}/> */}
            {Array.from(
                new Array(numPages),
                (el, index) => (
                <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderAnnotationLayer={false} 
                    renderTextLayer={false}
                    className={`my-2`}
                />
                ),
            )}
        </Document>
           
    )
}


export default PDFInlineReader