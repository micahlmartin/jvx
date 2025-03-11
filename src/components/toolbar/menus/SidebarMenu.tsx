import React from 'react';
import { useSidebar } from '@/contexts/SidebarContext';

interface SidebarMenuProps {}

export const SidebarMenu: React.FC<SidebarMenuProps> = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      aria-label={`${isSidebarVisible ? 'Hide' : 'Show'} sidebar`}
      className={`text-toolbar-text dark:text-toolbar-text-dark text-menu tracking-normal font-medium px-5 border-none cursor-pointer transition-colors duration-150 flex items-center h-full relative hover:bg-toolbar-hover dark:hover:bg-toolbar-hover-dark focus:outline-none`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] opacity-icon-default">
        <path d="M2.25 2.25h13.5v13.5H2.25V2.25zm3.375 0v13.5M2.25 7.875h3.375M2.25 12.375h3.375" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}; 