import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface TabContextMenuProps {
  x: number;
  y: number;
  onRename: () => void;
  onClose: () => void;
  onRequestClose: () => void;
}

export const TabContextMenu: React.FC<TabContextMenuProps> = ({
  x,
  y,
  onRename,
  onClose,
  onRequestClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onRequestClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    // Ensure menu stays within viewport bounds
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = x;
      let adjustedY = y;

      if (x + rect.width > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 8;
      }

      if (y + rect.height > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 8;
      }

      setPosition({ x: adjustedX, y: adjustedY });
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [x, y, onRequestClose]);

  const handleRename = () => {
    onRename();
    onRequestClose();
  };

  const handleClose = () => {
    onClose();
    onRequestClose();
  };

  const menu = (
    <div
      ref={menuRef}
      className="fixed bg-toolbar-bg dark:bg-toolbar-bg-dark border border-toolbar-border/30 dark:border-toolbar-border-dark/30 rounded-md py-[6px] min-w-[160px] shadow-menu dark:shadow-menu-dark backdrop-blur-menu z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <button
        onClick={handleRename}
        className="flex items-center w-full px-3 py-[6px] border-none bg-transparent text-toolbar-text dark:text-toolbar-text-dark text-menu text-left cursor-pointer hover:bg-toolbar-hover/50 dark:hover:bg-toolbar-hover-dark/50 focus:outline-none focus-visible:bg-toolbar-hover/50 dark:focus-visible:bg-toolbar-hover-dark/50 transition-colors duration-150 gap-2"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[15px] h-[15px] opacity-strong flex items-center justify-center"
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
      <div className="h-px mx-3 my-1.5 bg-toolbar-border/20 dark:bg-toolbar-border-dark/20" />
      <button
        onClick={handleClose}
        className="flex items-center w-full px-3 py-[6px] border-none bg-transparent text-toolbar-text dark:text-toolbar-text-dark text-menu text-left cursor-pointer hover:bg-toolbar-hover/50 dark:hover:bg-toolbar-hover-dark/50 focus:outline-none focus-visible:bg-toolbar-hover/50 dark:focus-visible:bg-toolbar-hover-dark/50 transition-colors duration-150 gap-2"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[15px] h-[15px] opacity-strong flex items-center justify-center"
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

  return createPortal(menu, document.body);
};
