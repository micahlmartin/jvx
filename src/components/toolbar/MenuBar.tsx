import React from 'react';
import styled from 'styled-components';
import { designSystem } from '@/styles/design-system';
import { FileMenu } from './menus/FileMenu';

const MenuBarContainer = styled.div`
  background: var(--background);
  border-bottom: ${designSystem.borders.node};
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 ${designSystem.spacing.nodePadding};
  z-index: ${designSystem.zIndex.nodeBase};
`;

const MenuItem = styled.button`
  color: var(--text-primary);
  font-size: ${designSystem.typography.sizes.label};
  padding: 8px 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: ${designSystem.effects.nodeHoverTransition};
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background: var(--node-bg);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const MenuSeparator = styled.div`
  width: 1px;
  height: 20px;
  background: var(--node-border);
  margin: 0 8px;
  opacity: 0.5;
`;

/**
 * MenuBar component that provides the main navigation menu for the application.
 * Implements a consistent design system and accessibility features.
 */
export const MenuBar: React.FC = () => {
  // Placeholder handlers for file menu actions
  const handleNewFile = () => {
    console.log('New File');
  };

  const handleOpenFile = () => {
    console.log('Open File');
  };

  const handleSaveFile = () => {
    console.log('Save File');
  };

  const handleSaveAs = () => {
    console.log('Save As');
  };

  return (
    <MenuBarContainer role="menubar" aria-label="Main menu">
      <FileMenu
        onNewFile={handleNewFile}
        onOpenFile={handleOpenFile}
        onSaveFile={handleSaveFile}
        onSaveAs={handleSaveAs}
      />
      <MenuItem role="menuitem" aria-haspopup="true">
        View
      </MenuItem>
      <MenuSeparator />
      <MenuItem role="menuitem" aria-haspopup="true">
        Edit
      </MenuItem>
    </MenuBarContainer>
  );
}; 