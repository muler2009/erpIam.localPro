import React from 'react'
import { Link } from 'react-router-dom'
import { FlexBox } from '../../../../components/common/StyledComponent'
import { category } from './menus'
import { FlexBoxInner } from '../../../../iam/components/reusable/StyledComponent'


interface CategoryDisplayInterface {
    category: CategoryDisplayInterface[]
}

const Category = () => {
  return (
    <FlexBox>
        {
            category?.map((category, index) => {
                return(
                    <FlexBoxInner key={index} className='flex flex-col gap-3 px-10'>
                        {
                            category.path && (
                                <Link to={category.path} className='flex space-x-3 text-sm items-center space-y-3'>
                                   <span className='pr-3'>{category.icon}</span> {category.label}
                                </Link>
                            )
                        }
                    </FlexBoxInner>
                )
            })
        }
    </FlexBox>
  )
}

export default Category