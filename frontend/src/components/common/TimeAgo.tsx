import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

interface TimeAgoProps {
    timestamp: string | Date;
    className: string
  }
  
  const TimeAgo = ({ timestamp }: TimeAgoProps) => {
    let timeAgo = '';
  
    if (timestamp) {
      const date = typeof timestamp === 'string' ? parseISO(timestamp) : timestamp;
      const timePeriod = formatDistanceToNow(date);
      timeAgo = `${timePeriod} ago`;
    }
  
    return (
      <span title={timestamp.toString()}>
        <p className='font-[500] texxt-[9px] text-blue-500'>
        &nbsp; {timeAgo}

        </p>
      </span>
    );
  };

export default TimeAgo