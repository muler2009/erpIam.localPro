import React, { useState, useMemo } from 'react'
import { FlexBox, FlexBoxInner, Text, P, Div } from '../../../../components/common/StyledComponent'
import { Link, useLocation } from 'react-router-dom'
import { requestMenu } from '../../../constants/menu-items/requestMenu'
import {SendRequest} from '.'
import useUtils from '../../../hooks/useUtils'
import { HiHome } from "react-icons/hi2";
import Tooltip from '../../../../iam/components/reusable/Tooltip'
import { BiSolidMessage } from "react-icons/bi";
import { findLabelByPath } from '../../../components/helper/LabelFinder'
import sidear_link from '../../../components/reusable/side-tree/menus'

const RequestNavigation = () => {

  const location = useLocation();

  // Get the current path
  const currentPath = location.pathname.split('/').pop(); // Get the last part of the path (e.g., "request" or "requested-sent")

  // Memoize the label for performance
  const currentLabel = useMemo(() => findLabelByPath(sidear_link, currentPath || ''), [currentPath]);

  return (
    <FlexBox className='pt-3 pb-2 flex justify-between items-center px-5 bg-white mx-[2px]'>
        <Text className='font-Poppins text-[20px] font-semibold text-[#333] text-opacity-50'>{currentLabel}</Text>
        <FlexBoxInner className='pr-10'>
          <Div className='flex relative'>
            <Text className='font-Poppins text-[#333] text-[13px]'>Notification</Text>
          </Div>
        </FlexBoxInner>
        
        
    </FlexBox>
  )
}

export default RequestNavigation