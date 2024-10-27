import React, { useMemo } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { RequestDataInterface } from '../../models/request-model'
import { Div } from '../../../components/common/StyledComponent'
import { format } from 'date-fns'

const metaColumnHandler = createColumnHelper<RequestDataInterface>()

const useMetadataColumn = () => {
    const metaColumn = useMemo(
        () => [
            metaColumnHandler.accessor(row => row.request_sent_at ,{
                id: "request_sent_at",
                header: () => <span className="font-normal text-[12px]">Uploaded Date</span>,
                cell: ({row}) => {
                    const uploadDate = row.original.request_sent_at || new Date()
                    return(
                        <Div>
                            {format(uploadDate, 'EE, dd yyyy')}
                        </Div>
                    )
                }
            }),
            metaColumnHandler.accessor(row => row.request_sent_at ,{
                id: "request_sent_at",
                header: () => <span className="font-normal text-[12px]">Time</span>,
                cell: ({row}) => {
                    const uploadDate = row.original.request_sent_at || new Date()
                    return(
                        <Div>
                            {format(uploadDate, 'HH:mm ss')}
                        </Div>
                    )
                }
            }),
            metaColumnHandler.accessor(row => row.file_url ,{
                id: "file_url",
                header: () => <span className="font-normal text-[12px]">File name</span>,
                cell: ({row}) => {
                    return(
                        <Div>
                            {row.original.file_name}
                        </Div>
                    )
                }
            }),
            metaColumnHandler.display({
                id: "request_sent_at",
                header: () => <span className="flex justify-end pr-10 font-normal text-[12px]">Action</span>,
                cell: ({row}) => {
                    return(
                        <Div>
                            action
                        </Div>
                    )
                }
            })


        ], [])

    return{metaColumn}
}

export default useMetadataColumn