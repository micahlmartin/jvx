import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ViewMenuProps {}

export const ViewMenu: React.FC<ViewMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

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
        className={`text-toolbar-text dark:text-toolbar-text-dark text-menu tracking-normal font-medium px-5 border-none cursor-pointer transition-colors duration-150 flex items-center h-full relative ${
          isOpen ? 'bg-toolbar-active dark:bg-toolbar-active-dark after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-toolbar-highlight dark:after:bg-toolbar-highlight-dark' : ''
        } hover:bg-toolbar-hover dark:hover:bg-toolbar-hover-dark focus:outline-none focus-visible:bg-toolbar-hover dark:focus-visible:bg-toolbar-hover-dark`}
      >
        View
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 bg-toolbar-bg dark:bg-toolbar-bg-dark border border-toolbar-border/30 dark:border-toolbar-border-dark/30 shadow-menu dark:shadow-menu-dark backdrop-blur-menu py-[6px] min-w-[180px] z-50"
        >
          <button
            onClick={toggleTheme}
            className="w-full text-left text-menu tracking-normal font-medium px-3 py-[6px] hover:bg-toolbar-hover/50 dark:hover:bg-toolbar-hover-dark/50 focus:outline-none focus-visible:bg-toolbar-hover/50 dark:focus-visible:bg-toolbar-hover-dark/50 transition-colors duration-150 flex items-center gap-3 text-toolbar-text dark:text-toolbar-text-dark"
          >
            <span className="w-[15px] h-[15px] opacity-icon-default flex items-center justify-center">
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.728 3.272l-1.06 1.06M4.332 11.668l-1.06 1.06M12.728 12.728l-1.06-1.06M4.332 4.332l-1.06-1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 8c0 3.038-2.462 5.5-5.5 5.5a5.5 5.5 0 0 1-5.5-5.5c0-3.038 2.462-5.5 5.5-5.5 .577 0 1.134.089 1.657.254a5.5 5.5 0 0 0 3.843 9.246A5.5 5.5 0 0 1 13.5 8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            Toggle Theme
          </button>
        </div>
      )}
    </div>
  );
};
