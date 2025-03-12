import React from 'react';
import { useSidebar } from '@/contexts/SidebarContext';

export const SidebarMenu: React.FC = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      aria-label={`${isSidebarVisible ? 'Hide' : 'Show'} sidebar`}
      className={`h-full px-4 text-[14px] font-medium text-toolbar-text dark:text-toolbar-text-dark hover:bg-white/5 focus:outline-none transition-colors duration-150 active:bg-white/10`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[16px] h-[16px] opacity-icon-default">
        <path d="M2.25 2.25h13.5v13.5H2.25V2.25zm3.375 0v13.5M2.25 7.875h3.375M2.25 12.375h3.375" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}; 