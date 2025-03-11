import React, { useState, useCallback } from 'react';
import { FileMenu } from './menus/FileMenu';
import { ViewMenu } from './menus/ViewMenu';
import { SidebarMenu } from './menus/SidebarMenu';
import { useDocuments } from '@/contexts/DocumentContext';
import { v4 as uuidv4 } from 'uuid';
import { Document } from '@/components/tabs/TabBar';
import { Tab } from '@/components/tabs/Tab';

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
  const { addDocument, renameDocument } = useDocuments();
  const [openContextMenu, setOpenContextMenu] = useState<{id: string, x: number, y: number} | null>(null);

  const handleContextMenu = useCallback((id: string, x: number, y: number) => {
    console.log('MenuBar handleContextMenu called:', { id, x, y });
    setOpenContextMenu({ id, x, y });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    console.log('MenuBar handleCloseContextMenu called');
    setOpenContextMenu(null);
  }, []);

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
    <div 
      role="menubar" 
      aria-label="Main menu"
      className="bg-toolbar-bg dark:bg-toolbar-bg-dark h-[38px] flex items-stretch border-b border-toolbar-border dark:border-toolbar-border-dark px-2 z-40"
    >
      <div className="flex items-stretch">
        <SidebarMenu />
        <div className="w-px h-[18px] bg-toolbar-border dark:bg-toolbar-border-dark mx-3 self-center" />
        <FileMenu
          onNewFile={handleNewFile}
          onOpenFile={handleOpenFile}
          onSaveFile={handleSaveFile}
          onSaveAs={handleSaveAs}
        />
        <ViewMenu />
      </div>
      <div className="w-px h-[18px] bg-toolbar-border dark:bg-toolbar-border-dark mx-3 self-center" />
      <div 
        role="tablist" 
        aria-label="Open documents"
        className="flex items-stretch flex-1 overflow-x-auto scrollbar-none"
      >
        {documents.map(doc => {
          const isContextMenuOpen = openContextMenu?.id === doc.id;
          console.log(`Tab ${doc.id} context menu state:`, { isContextMenuOpen, openContextMenu });
          
          return (
            <Tab
              key={doc.id}
              id={doc.id}
              name={doc.name}
              isActive={doc.id === activeDocument}
              isDirty={doc.isDirty}
              onActivate={() => onDocumentSelect(doc.id)}
              onClose={() => onDocumentClose(doc.id)}
              onRename={renameDocument}
              onContextMenu={handleContextMenu}
              contextMenuOpen={isContextMenuOpen}
              contextMenuPosition={isContextMenuOpen ? { x: openContextMenu.x, y: openContextMenu.y } : null}
              onContextMenuClose={handleCloseContextMenu}
            />
          );
        })}
        <button
          onClick={handleNewFile}
          aria-label="Create new document"
          title="Create new document"
          className="flex items-center justify-center w-10 h-full bg-transparent border-none text-toolbar-text dark:text-toolbar-text-dark cursor-pointer opacity-70 text-[22px] transition-colors duration-150 hover:opacity-100 hover:bg-toolbar-hover dark:hover:bg-toolbar-hover-dark focus:outline-none ml-2"
        >
          +
        </button>
      </div>
    </div>
  );
}; 