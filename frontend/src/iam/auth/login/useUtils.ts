 import React from 'react'

interface GroupBasedPaths {
  [key: string] : string
}

const avaialabelGroups: GroupBasedPaths = {
  admin: '/iam',
  client: '/client',
  directors: '/dms',
  default: 'defaultboard'
}

const useUtils = () => {
    const routeToDashboard = (group: string): string => {
      return avaialabelGroups[group] || avaialabelGroups.default
    }
    return { routeToDashboard }
  }
  
  export default useUtils