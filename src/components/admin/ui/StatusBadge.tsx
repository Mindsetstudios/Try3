import React from 'react';

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colors = {
    pending: 'bg-yellow-500/20 text-yellow-300',
    approved: 'bg-green-500/20 text-green-300',
    rejected: 'bg-red-500/20 text-red-300'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${colors[status]}`}>
      {status}
    </span>
  );
};