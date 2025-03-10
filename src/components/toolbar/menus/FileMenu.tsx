import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { designSystem } from '@/styles/design-system';

const MenuContainer = styled.div`
  position: relative;
`;

const MenuButton = styled.button<{ $isOpen: boolean }>`
  color: var(--text-primary);
  font-size: 14px;
  padding: 0 16px;
  background: ${props => props.$isOpen ? 'rgba(255, 255, 255, 0.08)' : 'transparent'};
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: ${props => props.$isOpen ? designSystem.zIndex.tooltip + 1 : 'auto'};
  opacity: 0.85;
  font-weight: 400;
  height: 100%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  ${props => props.$isOpen && `
    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.08);
    }
  `}
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background: #1E1E2E;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0 6px 6px 6px;
  min-width: 240px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: ${designSystem.zIndex.tooltip};
  margin-top: -1px;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 10px 16px;
  text-align: left;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.85;
  font-weight: 400;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    opacity: 1;
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
  }

  &:first-child {
    margin-top: 6px;
  }

  &:last-child {
    margin-bottom: 6px;
  }
`;

const MenuSeparator = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 6px 0;
`;

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
    <MenuContainer ref={menuRef}>
      <MenuButton
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        $isOpen={isOpen}
      >
        File
      </MenuButton>
      <DropdownMenu $isOpen={isOpen} role="menu" aria-label="File menu">
        <MenuItem onClick={() => {
          onNewFile?.();
          setIsOpen(false);
        }} role="menuitem">
          New File
        </MenuItem>
        <MenuItem onClick={() => {
          onOpenFile?.();
          setIsOpen(false);
        }} role="menuitem">
          Open File
        </MenuItem>
        <MenuSeparator />
        <MenuItem onClick={() => {
          onSaveFile?.();
          setIsOpen(false);
        }} role="menuitem">
          Save
        </MenuItem>
        <MenuItem onClick={() => {
          onSaveAs?.();
          setIsOpen(false);
        }} role="menuitem">
          Save As...
        </MenuItem>
      </DropdownMenu>
    </MenuContainer>
  );
}; 