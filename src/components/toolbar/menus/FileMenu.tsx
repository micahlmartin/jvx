import React, { useEffect, useRef, useState } from 'react';

interface FileMenuProps {
  onNewFile?: () => void;
  onOpenFile?: () => void;
  onSaveFile?: () => void;
  onSaveAs?: () => void;
}

/**
 * FileMenu component that provides file-related operations through a dropdown menu.
 * Implements keyboard navigation and accessibility features.
 */
export const FileMenu: React.FC<FileMenuProps> = ({
  onNewFile,
  onOpenFile,
  onSaveFile,
  onSaveAs,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        ref={buttonRef}
        id="file-menu-button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'file-menu-items' : undefined}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`h-full px-4 text-[14px] font-medium text-toolbar-text dark:text-toolbar-text-dark hover:bg-white/5 focus:outline-none transition-colors duration-150 ${
          isOpen ? 'bg-white/10' : ''
        }`}
      >
        File
      </button>
      {isOpen && (
        <div
          role="menu"
          aria-label="File menu"
          className="absolute top-full left-0 bg-toolbar-bg dark:bg-toolbar-bg-dark border border-toolbar-border/30 dark:border-toolbar-border-dark/30 shadow-menu dark:shadow-menu-dark backdrop-blur-menu py-[6px] min-w-[180px] z-50"
        >
          <button
            onClick={() => {
              onNewFile?.();
              setIsOpen(false);
            }}
            role="menuitem"
            className="w-full text-left text-menu tracking-normal font-medium px-3 py-[6px] hover:bg-toolbar-hover/50 dark:hover:bg-toolbar-hover-dark/50 focus:outline-none focus-visible:bg-toolbar-hover/50 dark:focus-visible:bg-toolbar-hover-dark/50 transition-colors duration-150 flex items-center gap-3 text-toolbar-text dark:text-toolbar-text-dark"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[15px] h-[15px] opacity-icon-default flex items-center justify-center"
            >
              <path
                d="M8 1v6h6M14 7V15H2V1h6l6 6z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            New File
          </button>
          <button
            onClick={() => {
              onOpenFile?.();
              setIsOpen(false);
            }}
            role="menuitem"
            className="w-full text-left text-menu tracking-normal font-medium px-3 py-[6px] hover:bg-toolbar-hover/50 dark:hover:bg-toolbar-hover-dark/50 focus:outline-none focus-visible:bg-toolbar-hover/50 dark:focus-visible:bg-toolbar-hover-dark/50 transition-colors duration-150 flex items-center gap-3 text-toolbar-text dark:text-toolbar-text-dark"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[15px] h-[15px] opacity-icon-default flex items-center justify-center"
            >
              <path
                d="M14 14H2V2h6l2 2h4v10z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Open File
          </button>
          <div className="h-px mx-3 my-1.5 bg-toolbar-border/20 dark:bg-toolbar-border-dark/20" />
          <button
            onClick={() => {
              onSaveFile?.();
              setIsOpen(false);
            }}
            role="menuitem"
            className="w-full text-left text-menu tracking-normal font-medium px-3 py-[6px] hover:bg-toolbar-hover/50 dark:hover:bg-toolbar-hover-dark/50 focus:outline-none focus-visible:bg-toolbar-hover/50 dark:focus-visible:bg-toolbar-hover-dark/50 transition-colors duration-150 flex items-center gap-3 text-toolbar-text dark:text-toolbar-text-dark"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[15px] h-[15px] opacity-icon-default flex items-center justify-center"
            >
              <path
                d="M12.5 9.5v4h-9v-4M8 2v8M8 2l3 3M8 2L5 5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Save
          </button>
          <button
            onClick={() => {
              onSaveAs?.();
              setIsOpen(false);
            }}
            role="menuitem"
            className="w-full text-left text-menu tracking-normal font-medium px-3 py-[6px] hover:bg-toolbar-hover/50 dark:hover:bg-toolbar-hover-dark/50 focus:outline-none focus-visible:bg-toolbar-hover/50 dark:focus-visible:bg-toolbar-hover-dark/50 transition-colors duration-150 flex items-center gap-3 text-toolbar-text dark:text-toolbar-text-dark"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[15px] h-[15px] opacity-icon-default flex items-center justify-center"
            >
              <path
                d="M12.5 9.5v4h-9v-4M8 2v8M8 2l3 3M8 2L5 5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 11.5h9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 1"
              />
            </svg>
            Save As...
          </button>
        </div>
      )}
    </div>
  );
};
