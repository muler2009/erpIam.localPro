 import React from 'react'

interface GroupBasedPaths {
  [key: string] : string
}

const avaialabelGroups: GroupBasedPaths = {
  admin: '/iam',
  active: '/dms',
  director: '/dms',
  default: 'defaultboard'
}

const useUtils = () => {
    const getGroupBasedDashboardPath = (group: string): string => {
      return avaialabelGroups[group] || avaialabelGroups.default
    }
    return {getGroupBasedDashboardPath}
  }
  
  export default useUtils