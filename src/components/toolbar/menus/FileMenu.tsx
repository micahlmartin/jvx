import React, { useState, useRef, useEffect } from 'react';

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
  onSaveAs
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    }
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`text-text-primary text-sm px-4 border-none cursor-pointer transition-all duration-150 flex items-center gap-1 opacity-85 font-normal h-full relative ${
          isOpen ? 'bg-[rgba(255,255,255,0.08)] after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-px after:bg-[rgba(255,255,255,0.08)]' : 'bg-transparent'
        } hover:bg-[rgba(255,255,255,0.08)] hover:opacity-100 focus:outline-none`}
      >
        File
      </button>
      {isOpen && (
        <div 
          role="menu" 
          aria-label="File menu"
          className="absolute top-full left-0 bg-[#1E1E2E] border border-[rgba(255,255,255,0.08)] rounded-[0_6px_6px_6px] min-w-[240px] shadow-lg z-50 -mt-px"
        >
          <button 
            onClick={() => {
              onNewFile?.();
              setIsOpen(false);
            }} 
            role="menuitem"
            className="w-full px-4 py-2.5 text-left bg-transparent border-none text-text-primary text-sm cursor-pointer transition-all duration-150 flex items-center gap-2 opacity-85 font-normal hover:bg-[rgba(255,255,255,0.08)] hover:opacity-100 focus:outline-none focus:bg-[rgba(255,255,255,0.08)] mt-1.5 first:mt-1.5 last:mb-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70">
              <path d="M8 1v6h6M14 7V15H2V1h6l6 6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            New File
          </button>
          <button 
            onClick={() => {
              onOpenFile?.();
              setIsOpen(false);
            }} 
            role="menuitem"
            className="w-full px-4 py-2.5 text-left bg-transparent border-none text-text-primary text-sm cursor-pointer transition-all duration-150 flex items-center gap-2 opacity-85 font-normal hover:bg-[rgba(255,255,255,0.08)] hover:opacity-100 focus:outline-none focus:bg-[rgba(255,255,255,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70">
              <path d="M14 14H2V2h6l2 2h4v10z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Open File
          </button>
          <div className="h-px bg-[rgba(255,255,255,0.08)] my-1.5" />
          <button 
            onClick={() => {
              onSaveFile?.();
              setIsOpen(false);
            }} 
            role="menuitem"
            className="w-full px-4 py-2.5 text-left bg-transparent border-none text-text-primary text-sm cursor-pointer transition-all duration-150 flex items-center gap-2 opacity-85 font-normal hover:bg-[rgba(255,255,255,0.08)] hover:opacity-100 focus:outline-none focus:bg-[rgba(255,255,255,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70">
              <path d="M12.5 9.5v4h-9v-4M8 2v8M8 2l3 3M8 2L5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save
          </button>
          <button 
            onClick={() => {
              onSaveAs?.();
              setIsOpen(false);
            }} 
            role="menuitem"
            className="w-full px-4 py-2.5 text-left bg-transparent border-none text-text-primary text-sm cursor-pointer transition-all duration-150 flex items-center gap-2 opacity-85 font-normal hover:bg-[rgba(255,255,255,0.08)] hover:opacity-100 focus:outline-none focus:bg-[rgba(255,255,255,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70">
              <path d="M12.5 9.5v4h-9v-4M8 2v8M8 2l3 3M8 2L5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 11.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1"/>
            </svg>
            Save As...
          </button>
        </div>
      )}
    </div>
  );
}; 