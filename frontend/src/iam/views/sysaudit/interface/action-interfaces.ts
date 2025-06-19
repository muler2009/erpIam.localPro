import { ModalComponentPropsInterface } from "../../../models/common-models"
import { APIResponseInterface } from "../../../models/sys_audit_interface"

export interface UnlockAccountModalInterface extends ModalComponentPropsInterface {
    rowData: APIResponseInterface
}