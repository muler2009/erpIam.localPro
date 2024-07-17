import React from 'react'
import { ModalBody, ModalContainer, ModalHeader, ModalWrapper } from '../../../../iam/components/reusable';

interface PdfInterface {
    openPdfs: boolean;
    setOpenPdfs: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalTest = ({openPdfs, setOpenPdfs} : PdfInterface) => {
  return (
    openPdfs ? (
        <ModalWrapper>
            <ModalContainer>
                <ModalHeader>sadsa</ModalHeader>
                <ModalBody>
                    <p>Testx</p>
                </ModalBody>
            </ModalContainer>
        </ModalWrapper>
    ): null   
  )
}

export default ModalTest