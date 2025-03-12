import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  icon?: React.ReactNode;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, icon }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className="w-full text-left px-3 py-[6px] hover:bg-toolbar-hover/50 dark:hover:bg-toolbar-hover-dark/50 focus:outline-none focus-visible:bg-toolbar-hover/50 dark:focus-visible:bg-toolbar-hover-dark/50 transition-colors duration-150 flex items-center gap-3 text-toolbar-text dark:text-toolbar-text-dark group"
    >
      {icon && (
        <span className="w-[15px] h-[15px] opacity-icon-default flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="flex-grow text-menu tracking-normal font-medium">{label}</span>
      <div className={`w-8 h-4 rounded-full transition-colors duration-150 relative ${checked ? 'bg-toolbar-highlight dark:bg-toolbar-highlight-dark' : 'bg-toolbar-border/30 dark:bg-toolbar-border-dark/30'}`}>
        <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full transition-transform duration-150 bg-white ${checked ? 'translate-x-4' : ''}`} />
      </div>
    </button>
  );
}; 