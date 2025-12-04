import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { shared } from "../menu-items/shared";
import * as BiIcons from 'react-icons/bi'
import { FlexBox, FlexBoxInner } from "../../../components/common/StyledComponent";
import * as CiIcons from "react-icons/ci";
import * as Fa6Icons from "react-icons/fa6";
import { LiaDownloadSolid } from "react-icons/lia";
import BottomTooltip from "../../../components/common/BottomTooltip";

export interface SharedColumn {
    name: string;
    shared_by: string;
    shared_date: string | undefined;
}

const sharedColumnHelper = createColumnHelper<SharedColumn>()
const DISPLAY_COLUMN_SIZE = 100;


const useSharedColumns = () => {

    const sharedColumn = useMemo(
        () => [
            sharedColumnHelper.accessor(row => row.name, {
                id: "name",
                header: () => <span>Name</span>,
                cell: props => props.row.original.name
            }),
            sharedColumnHelper.accessor(row => row.shared_by, {
                id: "name",
                header: () => <span>Shared By</span>,
                cell: props => props.row.original.shared_by
            }),
            sharedColumnHelper.accessor(row => row.shared_date, {
                id: "Shared Date",
                header: () => <span>Shared Date</span>,
                cell: props => props.row.original.shared_date
            }),
            // sharedColumnHelper.display({
            //     id: "actions",
            //     header: () => <span className="flex justify-end pr-10"><BiIcons.BiDotsVerticalRounded /></span>,
            //     cell: ({row }) => {
            //         return(
            //             <FlexBox className="flex justify-end items-center pr-20 invisible group-hover:visible">
            //                 <BottomTooltip content={`Share`}>
            //                     <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.name} Shared Clicked`)}>
            //                         <Fa6Icons.FaSlideshare size={15} />
            //                     </FlexBoxInner>
            //                 </BottomTooltip>
            //                 <BottomTooltip content={`Rename`}>
            //                     <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.name} Edit Clicked`)}>
            //                         <CiIcons.CiEdit size={17} />
            //                     </FlexBoxInner>
            //                 </BottomTooltip>
            //                 <BottomTooltip content={`Delete`}>
            //                     <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.name} Delete Clicked`)}>
            //                         <CiIcons.CiTrash size={17} />
            //                     </FlexBoxInner>
            //                 </BottomTooltip>
            //                 <BottomTooltip content={`Download`}>
            //                     <FlexBoxInner className="w-9 h-9 flex justify-center items-center hover:bg-gray-200 rounded-full" onClick={() => alert(`${row.original.name} Download Clicked`)}>
            //                         <LiaDownloadSolid size={17} />
            //                     </FlexBoxInner>
            //                 </BottomTooltip>
            //           </FlexBox>
            //         )
            //     }
            // }),
        ],
        []
    )

    return {sharedColumn}

}

export const data = [
    {name: "AbdulAzzim_13511_BIS_FinalDissertation_TMMS", shared_by: "Muleta", shared_date: "Tuesday 30 2024"},
    {name: "Andrew Tanenbaum, Nick Feamster, David Wetherall - Computer Networks, Global Edition-Pearson (2021)", shared_by: "Mengesha", shared_date: "Tuesday 30 2024"},
    {name: "McGraw.Hill.Cisco.Certified.Network.Associate.Study.Guide.Ex", shared_by: "Megerssa", shared_date: "Tuesday 30 2024"},
    {name: "Temptation Confessions of a Marriage Counselor _ 720p BRRip x264-PLAYNOW", shared_by: "Lidiys", shared_date: "Tuesday 30 2024"},
]


export default useSharedColumns;