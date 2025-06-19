import React from 'react'
import { AccessFailureLogsAPIResponse, AccessFailureLogsInterface } from '../../../models/sys_audit_interface';

const useAuditUtils = () => {
  // Generic type guard to check if data is an array of any type T
  const isArrayOfType = <T>(data: unknown): data is T[] => {
    return Array.isArray(data);
  };

  return {
    isArrayOfType,
  };
  
};

export default useAuditUtils