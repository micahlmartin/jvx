import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { designSystem } from '@/styles/design-system';

const MenuContainer = styled.div`
  position: relative;
`;

const MenuButton = styled.button<{ $isOpen: boolean }>`
  color: var(--text-primary);
  font-size: ${designSystem.typography.sizes.label};
  padding: 8px 12px;
  background: ${props => props.$isOpen ? 'var(--background)' : 'transparent'};
  border: none;
  cursor: pointer;
  transition: ${designSystem.effects.nodeHoverTransition};
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: ${props => props.$isOpen ? designSystem.zIndex.tooltip + 1 : 'auto'};
  
  &:hover {
    background: ${props => props.$isOpen ? 'var(--background)' : 'var(--node-bg)'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  ${props => props.$isOpen && `
    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--background);
    }
  `}
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--background);
  border: ${designSystem.borders.node};
  border-radius: 0 ${designSystem.borders.radius.node} ${designSystem.borders.radius.node} ${designSystem.borders.radius.node};
  min-width: 200px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: ${designSystem.zIndex.tooltip};
  margin-top: -1px;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: ${designSystem.typography.sizes.label};
  cursor: pointer;
  transition: ${designSystem.effects.nodeHoverTransition};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: var(--node-bg);
  }

  &:focus {
    outline: none;
    background: var(--node-bg);
  }

  &:first-child {
    margin-top: 4px;
  }

  &:last-child {
    margin-bottom: 4px;
  }
`;

const MenuSeparator = styled.div`
  height: 1px;
  background: var(--node-border);
  margin: 4px 0;
  opacity: 0.5;
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
        <MenuItem onClick={onNewFile} role="menuitem">
          New File
        </MenuItem>
        <MenuItem onClick={onOpenFile} role="menuitem">
          Open File
        </MenuItem>
        <MenuSeparator />
        <MenuItem onClick={onSaveFile} role="menuitem">
          Save
        </MenuItem>
        <MenuItem onClick={onSaveAs} role="menuitem">
          Save As...
        </MenuItem>
      </DropdownMenu>
    </MenuContainer>
  );
}; 