import React from 'react'
import { RoleModalContent, RoleModalPropsInterface } from '../../../../models/role.models'
import { ModalContainer, ModalWrapper, ModalHeader, ModalBody } from '../../../../components/reusable'

import AddRole from './AddRole'



const RoleModal = ({isOpen, onRequestClose, title, link_identifier}: RoleModalPropsInterface) => {

    const modalContent: RoleModalContent = {
        add: <AddRole isOpen={isOpen} onRequestClose={onRequestClose} title={title}  />
    };

    const safeLinkIdentifier = link_identifier ?? "defaultKey";

  return (
    isOpen ? (
        <ModalWrapper>
            {modalContent[safeLinkIdentifier]}
        </ModalWrapper>
    ): null
  )
}

export default RoleModal