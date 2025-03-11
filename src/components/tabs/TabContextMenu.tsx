import React from 'react';

interface TabContextMenuProps {
  x: number;
  y: number;
  onRename: () => void;
  onClose: () => void;
}

export const TabContextMenu: React.FC<TabContextMenuProps> = ({
  x,
  y,
  onRename,
  onClose,
}) => {
  return (
    <div 
      className="fixed bg-background-dark border border-node-border rounded-md p-1 min-w-[160px] shadow-lg backdrop-blur-md z-[1000] tab-context-menu"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <button 
        onClick={onRename}
        className="flex items-center w-full px-3 py-2 border-none bg-transparent text-text-primary dark:text-white text-[13px] text-left cursor-pointer rounded hover:bg-node-bg gap-2"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5 opacity-70"
        >
          <path 
            d="M11.5 2.5L13.5 4.5M7.5 12.5H13.5M2.5 9.5L10.5 1.5L12.5 3.5L4.5 11.5L2 12L2.5 9.5Z" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        Rename
      </button>
      <div className="h-px mx-3 my-1.5 bg-gray-300 dark:bg-gray-600" />
      <button 
        onClick={onClose}
        className="flex items-center w-full px-3 py-2 border-none bg-transparent text-text-primary dark:text-white text-[13px] text-left cursor-pointer rounded hover:bg-node-bg gap-2"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5 opacity-70"
        >
          <path 
            d="M12 4L4 12M4 4l8 8" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        Close
      </button>
    </div>
  );
}; 