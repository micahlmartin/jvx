import React from 'react';
import styled from 'styled-components';
import { designSystem } from '@/styles/design-system';
import { FileMenu } from './menus/FileMenu';
import { useDocuments } from '@/contexts/DocumentContext';
import { v4 as uuidv4 } from 'uuid';
import { Document } from '@/components/tabs/TabBar';
import { Tab } from '@/components/tabs/Tab';

const MenuBarContainer = styled.div`
  background: rgba(30, 30, 46, 0.95);
  height: 40px;
  display: flex;
  align-items: center;
  z-index: ${designSystem.zIndex.nodeBase};
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const MenuSection = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4px;
  height: 100%;
  gap: 2px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

const TabsSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  gap: 1px;
  padding-left: 8px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NewTabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 100%;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  opacity: 0.7;
  font-size: 18px;
  transition: all 0.1s ease;
  
  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: none;
  }
`;

const MenuItem = styled.button`
  color: var(--text-primary);
  font-size: ${designSystem.typography.sizes.label};
  padding: 0 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.1s ease;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 4px;
  opacity: 0.9;
  font-weight: 400;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

interface MenuBarProps {
  documents: Document[];
  activeDocument: string | null;
  onDocumentSelect: (id: string) => void;
  onDocumentClose: (id: string) => void;
}

/**
 * MenuBar component that provides the main navigation menu for the application.
 * Implements a consistent design system and accessibility features.
 */
export const MenuBar: React.FC<MenuBarProps> = ({
  documents,
  activeDocument,
  onDocumentSelect,
  onDocumentClose
}) => {
  const { addDocument } = useDocuments();

  const handleNewFile = () => {
    addDocument({
      id: uuidv4(),
      name: 'Untitled',
      content: '{}',
      isDirty: false,
      type: 'json'
    });
  };

  const handleOpenFile = () => {
    // TODO: Implement file open dialog
    console.log('Open File');
  };

  const handleSaveFile = () => {
    // TODO: Implement file save
    console.log('Save File');
  };

  const handleSaveAs = () => {
    // TODO: Implement save as dialog
    console.log('Save As');
  };

  return (
    <MenuBarContainer role="menubar" aria-label="Main menu">
      <MenuSection>
        <FileMenu
          onNewFile={handleNewFile}
          onOpenFile={handleOpenFile}
          onSaveFile={handleSaveFile}
          onSaveAs={handleSaveAs}
        />
        <MenuItem role="menuitem" aria-haspopup="true">
          View
        </MenuItem>
        <MenuItem role="menuitem" aria-haspopup="true">
          Edit
        </MenuItem>
      </MenuSection>
      <TabsSection role="tablist" aria-label="Open documents">
        {documents.map(doc => (
          <Tab
            key={doc.id}
            id={doc.id}
            name={doc.name}
            isActive={doc.id === activeDocument}
            isDirty={doc.isDirty}
            onActivate={() => onDocumentSelect(doc.id)}
            onClose={() => onDocumentClose(doc.id)}
          />
        ))}
        <NewTabButton
          onClick={handleNewFile}
          aria-label="Create new document"
          title="Create new document"
        >
          +
        </NewTabButton>
      </TabsSection>
    </MenuBarContainer>
  );
}; 