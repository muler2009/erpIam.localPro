import React from "react";
import {  ModalWrapper } from "../../../../../components/reusable";
import { UserModalActionInterface } from "../../../../../models/user.model";
import DeactivateAccountComponent from "./DeactivateAccountComponent";
import { RoleModalContent } from "../../../../../models/role.models";
import { rename } from "fs";
import UserDetailViewModal from "../../../constants/columns/user-action-modal/UserDetailViewModal";

const UserActionModalTemplateComponent = ({isOpen, onRequestClose, title, link_identifier, rowData}: UserModalActionInterface) => {

    const modalContent: RoleModalContent = {
        deactivate: <DeactivateAccountComponent isOpen={isOpen} onRequestClose={onRequestClose} title={title} rowData={rowData}/>,
        rename: <DeactivateAccountComponent isOpen={isOpen} onRequestClose={onRequestClose} title={title} />,
        detail: <UserDetailViewModal isOpen={isOpen} onRequestClose={onRequestClose} title={title} rowData={rowData} />,
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

export default UserActionModalTemplateComponent