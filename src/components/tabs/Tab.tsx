import React, { useState, useRef, useEffect } from 'react';
import { TabContextMenu } from './TabContextMenu';

interface TabProps {
  id: string;
  name: string;
  isActive: boolean;
  isDirty: boolean;
  onActivate: () => void;
  onClose: () => void;
  onRename?: (id: string, newName: string) => void;
  onContextMenu?: (id: string, x: number, y: number) => void;
  contextMenuOpen?: boolean;
  contextMenuPosition?: { x: number; y: number } | null;
  onContextMenuClose?: () => void;
}

export const Tab: React.FC<TabProps> = ({
  id,
  name,
  isActive,
  isDirty,
  onActivate,
  onClose,
  onRename,
  onContextMenu,
  contextMenuOpen = false,
  contextMenuPosition = null,
  onContextMenuClose = () => {}
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onRename) {
      setIsEditing(true);
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log('Tab handleContextMenu called', { id, x: e.clientX, y: e.clientY });
    e.preventDefault();
    e.stopPropagation();
    if (onContextMenu) {
      onContextMenu(id, e.clientX, e.clientY + 2);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editValue.trim()) {
      onRename?.(id, editValue.trim());
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setEditValue(name);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (editValue.trim() && editValue !== name) {
      onRename?.(id, editValue.trim());
    } else {
      setEditValue(name);
    }
    setIsEditing(false);
  };

  const startRename = () => {
    setIsEditing(true);
  };

  return (
    <>
      <div
        className={`flex items-center h-full px-2 gap-2 border-r border-toolbar-border dark:border-toolbar-border-dark cursor-pointer select-none min-w-[120px] max-w-[200px] relative ${
          isActive ? 'bg-toolbar-active dark:bg-toolbar-active-dark' : 'bg-transparent'
        } hover:bg-toolbar-hover dark:hover:bg-toolbar-hover-dark group`}
        onClick={onActivate}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        role="tab"
        aria-selected={isActive}
      >
        <div className={`flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-toolbar-text dark:text-toolbar-text-dark text-menu ${isEditing ? 'hidden' : 'block'} flex items-center`}>
          <span className="inline-flex items-center justify-center text-[rgb(255,192,120)] mr-3 font-semibold text-[9px] font-['JetBrains_Mono','JetBrains_Mono_Fallback'] tracking-[0.25px] uppercase leading-[14px] h-[14px] whitespace-nowrap overflow-hidden text-ellipsis">json</span>
          {name}
        </div>
        {isEditing ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="flex-1 bg-transparent border-none outline-none text-toolbar-text dark:text-toolbar-text-dark text-menu p-0 m-0 w-full focus:outline-none"
          />
        ) : null}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close tab"
          className={`flex items-center justify-center w-4 h-4 border-none bg-transparent text-toolbar-text dark:text-toolbar-text-dark cursor-pointer p-0 rounded hover:opacity-full hover:bg-toolbar-hover dark:hover:bg-toolbar-hover-dark ${isDirty ? 'group-hover:block hidden' : ''}`}
        >
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {isDirty && (
          <div className={`w-2 h-2 rounded-full bg-toolbar-text dark:bg-toolbar-text-dark opacity-dimmed group-hover:hidden`} />
        )}
      </div>
      {contextMenuOpen && contextMenuPosition && (
        <TabContextMenu
          x={contextMenuPosition.x}
          y={contextMenuPosition.y}
          onRename={startRename}
          onClose={onClose}
          onRequestClose={onContextMenuClose}
        />
      )}
    </>
  );
}; 