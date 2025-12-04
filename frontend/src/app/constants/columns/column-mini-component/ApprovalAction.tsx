import React, { useState } from "react";
import {
  ModalContainer,
  ModalWrapper,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../../../../iam/components/reusable";
import {
  Div,
  FlexBox,
  FlexBoxInner,
  Text,
} from "../../../../components/common/StyledComponent";
import * as VscIcons from "react-icons/vsc";
import { IntermediateAPIResponse } from "../../../models/request-model";
import TextInput from "../../../../components/common/TextInput";
import { ApprovalSelect } from "../useRequestReceivedColumn";
import { format } from "date-fns";
import PdfReader from "../../../components/common/PDFReader";
import PerformTransition from "./PerformTransition";
import { HiOutlineDocument } from "react-icons/hi";
import PDFInlineReader from "../../../components/common/PDFInlineReader";
import * as RxIcons from "react-icons/rx";
import { GiUluru } from "react-icons/gi";
import BottomTooltip from "../../../../components/common/BottomTooltip";

interface ApprovalActionInterface {
  open: boolean;
  handleIsOpenCloseMenuModal: () => void;
  requestData: IntermediateAPIResponse;
  approvalStatus: Record<string | number, string>;
}

const ApprovalAction = ({
  open,
  handleIsOpenCloseMenuModal,
  requestData,
}: ApprovalActionInterface) => {
  const [approvalStatus, setApprovalStatus] = useState<
    Record<string | number, string>
  >({});
  const [openPdfs, setOpenPdfs] = useState<boolean>(false);
  const [comments, setComments] = useState<string>();
  const [approvalPolicy, setApprovalPolicy] = useState<boolean>(false);

  const handleApprovalChange = (rowId: string | number, status: string) => {
    setApprovalStatus((prev) => ({ ...prev, [rowId]: status }));
  };
  const date = requestData.request?.request_sent_at || new Date();
  console.log(requestData.request?.file_for_approval?.version_number);
  return open ? (
    <ModalWrapper>
      <ModalContainer
        className={`mx-auto flex flex-col border-[#ddd] shadow-xl rounded-[5px] relative top-[5%] h-[80vh] ${
          approvalPolicy ? "w-[60%]" : "w-[35%]"
        }`}
      >
        <ModalHeader className="py-[10px] px-5 flex justify-between items-center cursor-pointer bg-[#e6e6e6] rounded-t-[4px] border-b border-gray-400 border-opacity-50">
          <Text className=" text-[14px] font-Poppins flex justify-center items-center">
            <span className="mr-2">{/* <GiConfirmed size={25}/>  */}</span>
            Request Approval Plugin
          </Text>
          {
            VscIcons.VscClose({
              size: 20,
              onClick: handleIsOpenCloseMenuModal
            })
          }
          
        </ModalHeader>

        <ModalBody className={`bg-gray-50 flex space-x-1 p-[1px] h-[60vh]`}>
          <FlexBox className="flex-grow border h-full">
            <FlexBoxInner className="pt-5 flex flex-col space-y-1 px-3 relative">
              <Div className="flex justify-between items-center space-x-1 pl-3 relative z-50">
                <div className="flex justify-start items-center space-x-1 px-3">
                  <span className="ring-2 ring-yellow-500  text-yellow-700 font-semibold rounded-full px-4">
                    pending
                  </span>
                  <Text className="flex-grow pl-3">
                    {requestData?.request.requesting_user}, Ethiopia
                  </Text>
                </div>
                {openPdfs && (
                  <span>
                    <Text className="text-red-400 pr-1" onClick={() => setOpenPdfs(false)}>
                      <BottomTooltip content="Close Pdf">
                        {
                          VscIcons.VscClose({size: 20})
                        }
                      </BottomTooltip>
                    </Text>
                  </span>
                )}
                <div
                  onClick={() => setApprovalPolicy((prev) => !prev)}
                  className="cursor-pointer w-8 h-8 border-[1px] border-black rounded-full absolute flex justify-center items-center -right-8 bg-gray-200 text-black z-auto"
                >
                  {approvalPolicy ? (
                    RxIcons.RxCaretLeft({})
                  ) : (
                    RxIcons.RxCaretRight({})
                  )}
                </div>
              </Div>

              <Div className="pt-1">
                {openPdfs ? (
                  <Div className="h-[60vh] overflow-y-scroll overflow-x-scroll">
                    <PDFInlineReader
                      pdfURL={`${requestData.request?.file_url}`}
                    />
                  </Div>
                ) : (
                  <>
                    <Div className="pt-3 pb-2 flex flex-col space-y-1">
                      <div className="flex justify-start items-center space-x-1 px-3 bg-white py-2">
                        <Text className="w-1/4">Request_Made_on</Text>
                        <Text className="flex-grow font-semibold px-4">
                          {format(date, "EE, mm, yyyy")}
                        </Text>
                      </div>
                      <div className="flex justify-start items-center space-x-1 px-3 bg-white py-2">
                        <Text className="w-1/4">Request_Type</Text>
                        <Text className="flex-grow font-semibold px-4">
                          {requestData?.request.request_type}
                        </Text>
                      </div>
                      <div className="flex justify-start items-center space-x-1 px-3 bg-white py-2">
                        <Text className="w-1/4">Approved_by</Text>
                        <Text className="flex-grow font-semibold px-4">
                          {requestData?.user}
                        </Text>
                      </div>
                      <div className="flex justify-start items-center space-x-1 px-3 bg-white py-2">
                        <Text className="w-1/4">Duration</Text>
                        <Text className="flex-grow font-semibold px-4">
                          3 days ago
                        </Text>
                      </div>
                      <div className="flex justify-start items-center space-x-1 px-3 bg-white py-2">
                        <Text className="w-1/4">Attachment</Text>
                        <Text
                          className="flex-grow px-4  text-blue-600 hover:underline"
                          onClick={() => setOpenPdfs(true)}
                        >
                          {requestData?.request?.file_name}
                        </Text>
                      </div>
                      <div className="flex justify-start items-center space-x-1 px-3 bg-white py-2">
                        <Text className="w-1/4">Document Version</Text>
                        <Text className="flex-grow px-4 text-nowrap text-blue-600 hover:underline">
                          {
                            requestData?.request?.file_for_approval?.version_number
                          }
                        </Text>
                      </div>
                      <div className="flex justify-start items-center space-x-1 px-5 py-2 border rounded-[3px] border-primary-green bg-primary-green bg-opacity-5">
                        Comment: On the Enterprise plan, organization admins can
                        approve plugins and widgets on a workspace-by-workspace
                        basis. As a result, you might only be able to use a
                        plugin or widget in one workspace, but not another.
                      </div>
                    </Div>
                    <Div className="bg-white px-3 py-2 h-full">
                      <TextInput
                        label="Provide your comment"
                        type="text"
                        placeholder="Comment while approval"
                        name="comments"
                        className="input-md text-[12px]"
                        rows={5}
                        desc="optional"
                        value={comments}
                        onChange={(event: any) => setComments(event.target.value) }
                      />
                    </Div>
                  </>
                )}
              </Div>
            </FlexBoxInner>
          </FlexBox>

          {approvalPolicy && (
            <Div className="ml-4 w-[100%] h-full overflow-y-scroll bg-white border">
              <p className="font-IBMPlexSans pl-10 font-bold text-sm py-4">Approval Requirement</p>
              <Div className="px-4 py-2 flex flex-col gap-1">
                

                <ol className="list-decimal px-2 py-2 ">
                  <li className="text-[14px] pb-4">Instruction
                    <ul className="px-7 py-3 mt-4 list-disc text-justify text-[12px] text-blue-500 border rounded-[3px] border-primary-green bg-primary-green bg-opacity-5">
                      <li>The devotion of time and attention to acquiring knowledge on an academic</li>
                      <li>A plan or drawing produced to show the look and function or workings of a building,  or made</li>
                      <li>The devotion of time and attention to acquiring knowledge on an academic subject, especially by means of books</li>
                      <li>A plan or drawing produced to show the look and function or workings of a building, or made</li>
                    </ul>
                  </li>     
                               
                </ol>

              </Div>
            </Div>
          )}
        </ModalBody>
        <ModalFooter className="border-t bg-white z-50">
          <FlexBoxInner className="px-3 pt-3 flex flex-col gap-2 w-[50%]">
            <Div className="flex flex-col">
              <Text>Approval Action</Text>
              <p className="text-[11px] text-[#333] text-opacity-55">
                select approval action and click the button to take action
              </p>
            </Div>
            <ApprovalSelect
              rowId={requestData.request?.request_id}
              onApprovalChange={handleApprovalChange}
              currentStatus={approvalStatus[requestData.request?.request_id]}
              rowData={requestData}
            />
            <PerformTransition
              rowData={requestData}
              approvalStatus={approvalStatus[requestData.request?.request_id]}
              comments={comments}
              handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
            />
          </FlexBoxInner>
        </ModalFooter>
      </ModalContainer>
    </ModalWrapper>
  ) : null;
};

export default ApprovalAction;
