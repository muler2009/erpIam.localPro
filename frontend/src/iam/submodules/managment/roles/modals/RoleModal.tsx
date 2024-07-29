import React from 'react'
import { RoleModalContent, RoleModalPropsInterface } from '../../../../models/role.models'
import { ModalContainer, ModalWrapper, ModalHeader, ModalBody } from '../../../../components/reusable'
import * as Vsc from 'react-icons/vsc'
import AddRole from './AddRole'
import DownloadRoleAssignment from './DownloadRoleAssignment'


const RoleModal = ({isOpen, onRequestClose, title, link_identifier}: RoleModalPropsInterface) => {

    const modalContent: RoleModalContent = {
        Add: <AddRole isOpen={isOpen} onRequestClose={onRequestClose} title={title} />,
        Remove: <DownloadRoleAssignment isOpen={isOpen} onRequestClose={onRequestClose} title={title} />,
        defaultKey: <div>No content available</div>
    };

    const safeLinkIdentifier = link_identifier ?? "defaultKey";

    return (
        isOpen ? (
            <ModalWrapper>
                {modalContent[safeLinkIdentifier]}
            </ModalWrapper>
        ) : null
    
      )
    }

export default RoleModal