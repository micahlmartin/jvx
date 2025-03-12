import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Toggle } from '@/components/ui/Toggle';

export const ViewMenu: React.FC = () => {
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
    <div 
      ref={menuRef} 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`h-full px-4 text-[14px] font-medium text-toolbar-text dark:text-toolbar-text-dark hover:bg-white/5 focus:outline-none transition-colors duration-150 ${
          isOpen ? 'bg-white/10' : ''
        }`}
      >
        View
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 bg-toolbar-bg dark:bg-toolbar-bg-dark border border-toolbar-border/30 dark:border-toolbar-border-dark/30 shadow-menu dark:shadow-menu-dark backdrop-blur-menu py-[6px] min-w-[180px] z-50">
          <Toggle
            checked={theme === 'dark'}
            onChange={toggleTheme}
            label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            icon={theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.728 3.272l-1.06 1.06M4.332 11.668l-1.06 1.06M12.728 12.728l-1.06-1.06M4.332 4.332l-1.06-1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 8c0 3.038-2.462 5.5-5.5 5.5a5.5 5.5 0 0 1-5.5-5.5c0-3.038 2.462-5.5 5.5-5.5 .577 0 1.134.089 1.657.254a5.5 5.5 0 0 0 3.843 9.246A5.5 5.5 0 0 1 13.5 8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          />
        </div>
      )}
    </div>
  );
};
