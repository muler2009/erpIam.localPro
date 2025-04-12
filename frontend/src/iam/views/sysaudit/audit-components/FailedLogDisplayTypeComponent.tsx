import React, { useState } from 'react'
import AccessFailedLogInformation from './AccessFailedLogInformation'
import AccessFailedLogsUI from './AccessFailedLogsUI'
import * as VscIcons from "react-icons/vsc";


const FailedLogDisplayTypeComponent = ({ viewType }: { viewType: 'list' | 'table' }) => {
  return (
    <div className=''>
        {
           viewType === 'list' ? <AccessFailedLogsUI /> : <AccessFailedLogInformation />
        }
    </div>
  )
}

export default FailedLogDisplayTypeComponent