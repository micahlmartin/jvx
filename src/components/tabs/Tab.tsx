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
}

export const Tab: React.FC<TabProps> = ({
  id,
  name,
  isActive,
  isDirty,
  onActivate,
  onClose,
  onRename
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenu) {
        const target = e.target as HTMLElement;
        if (!target.closest('.tab-context-menu')) {
          setContextMenu(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRename) {
      setIsEditing(true);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRename) {
      setContextMenu({ x: e.clientX, y: e.clientY });
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
    setContextMenu(null);
    setIsEditing(true);
  };

  return (
    <>
      <div
        className={`flex items-center h-full px-2 gap-2 border-r border-toolbar-border dark:border-toolbar-border-dark cursor-pointer select-none min-w-[120px] max-w-[200px] relative ${
          isActive ? 'bg-toolbar-active dark:bg-toolbar-active-dark' : 'bg-transparent'
        } hover:bg-toolbar-hover dark:hover:bg-toolbar-hover-dark`}
        onClick={onActivate}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        role="tab"
        aria-selected={isActive}
      >
        {isDirty && (
          <div className="w-1 h-1 rounded-full bg-toolbar-text dark:bg-toolbar-text-dark opacity-50" />
        )}
        <div className={`flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-toolbar-text dark:text-toolbar-text-dark text-menu ${isEditing ? 'hidden' : 'block'}`}>
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
          className="flex items-center justify-center w-4 h-4 border-none bg-transparent text-toolbar-text dark:text-toolbar-text-dark opacity-50 cursor-pointer p-0 rounded hover:opacity-100 hover:bg-toolbar-hover dark:hover:bg-toolbar-hover-dark"
        >
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {contextMenu && (
        <TabContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onRename={startRename}
          onClose={onClose}
        />
      )}
    </>
  );
}; 