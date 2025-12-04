import { useState } from "react";
import { FlexBox, FlexBoxInner,  } from "../../../../../../components/common/StyledComponent";
import { UserAPIResponse } from "../../../../../models/user.model";
import BottomTooltip from "../../../../../../components/common/BottomTooltip";
import * as CiIcons from 'react-icons/ci'
import * as MdIcons from "react-icons/md";
import { useModal } from "../../../../../components/reusable/custom-modal/context/useModal";
import * as IoIcons from "react-icons/io";
import { UserActionMenuItemsProps } from "../../../../../models/user.model";
import useCommonUtils from "../../../../../../hooks/useCommonUtils";
import UserActionModalTemplateComponent from "../../../user/views/user-modals/UserActionModalTemplateComponent";
import * as CgIcons from "react-icons/cg";


export const userActionButtons: UserActionMenuItemsProps[] = [
 {
    label: "Rename",
    abbrevation: "rename",
    icon: <>{CiIcons.CiEdit({size: 17})}</>
  },
  {
    label: "Detail",
    abbrevation: "detail",
    icon:  <>{CgIcons.CgDetailsMore({size: 17})}</>
  },
  {
    label: "Delete",
    abbrevation: "delete",
    icon:  <>{CiIcons.CiTrash({size: 17})}</>
  },
]

const ActionOnUserComponent = ({rowData} : {rowData: UserAPIResponse}) => {
    const {isOpen, handleIsOpenCloseMenu} = useCommonUtils()
    return(
      <>
        <FlexBox className={`flex justify-end items-center pr-20 invisible group-hover:visible`}>
          {
            userActionButtons.map((userAction, index) => (
              <BottomTooltip content={userAction.label} key={index}>
                  <FlexBoxInner
                      className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full"
                      onClick={() => handleIsOpenCloseMenu(userAction.abbrevation || "")}
                  >
                      {userAction.icon}
                  </FlexBoxInner>
              </BottomTooltip>
          ))}
             
        </FlexBox>
          {
            Object.keys(isOpen).map(abbrevation => 
              isOpen[abbrevation] && (
                <UserActionModalTemplateComponent 
                  key={abbrevation}
                  isOpen={isOpen[abbrevation]}
                  onRequestClose={() => handleIsOpenCloseMenu(abbrevation)}
                  title={abbrevation}
                  link_identifier={abbrevation}
                  rowData={rowData}
                />
              )
            )
          }
      
      </>

    )
}

export default ActionOnUserComponent



{/* <FlexBox className="flex justify-end items-center pr-20">
             <BottomTooltip content={`deactivate`}>
                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" 
                            >
                    <MdIcons.MdOutlineAirplanemodeActive size={17} />
                </FlexBoxInner>
            </BottomTooltip>
            <BottomTooltip content={`Rename`}>
                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`Edit Clicked`)}>
                    <CiIcons.CiEdit size={17} />
                </FlexBoxInner>
            </BottomTooltip>
            <BottomTooltip content={`Delete`}>
                <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`Delete Clicked`)}>
                    <CiIcons.CiTrash size={17} />
                </FlexBoxInner>
            </BottomTooltip>
        </FlexBox>  */}