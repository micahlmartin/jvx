import React, { useCallback, useEffect, useState } from 'react';

import { Tab } from './Tab';

export interface Document {
  id: string;
  name: string;
  content: string;
  isDirty: boolean;
  type: string;
  path?: string;
}

interface TabBarProps {
  documents: Document[];
  activeDocument: string | null;
  onDocumentSelect: (id: string) => void;
  onDocumentClose: (id: string) => void;
  onDocumentRename?: (id: string, newName: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  documents,
  activeDocument,
  onDocumentSelect,
  onDocumentClose,
  onDocumentRename,
}) => {
  const [openContextMenu, setOpenContextMenu] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  const handleContextMenu = useCallback((id: string, x: number, y: number) => {
    console.log('TabBar handleContextMenu called:', { id, x, y });
    setOpenContextMenu({ id, x, y });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    console.log('TabBar handleCloseContextMenu called');
    setOpenContextMenu(null);
  }, []);

  // Debug render
  useEffect(() => {
    console.log('TabBar render - openContextMenu:', openContextMenu);
  }, [openContextMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openContextMenu) return;

      const target = event.target as HTMLElement;
      if (!target.closest('.tab-context-menu')) {
        handleCloseContextMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openContextMenu) {
        handleCloseContextMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openContextMenu, handleCloseContextMenu]);

  return (
    <div
      role="tablist"
      aria-label="Open documents"
      className="flex items-center h-8 bg-toolbar-bg dark:bg-toolbar-bg-dark border-b border-toolbar-border dark:border-toolbar-border-dark overflow-x-auto scrollbar-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex h-full">
        {documents.map((doc) => {
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
              onRename={onDocumentRename}
              onContextMenu={handleContextMenu}
              contextMenuOpen={isContextMenuOpen}
              contextMenuPosition={
                isContextMenuOpen ? { x: openContextMenu.x, y: openContextMenu.y } : null
              }
              onContextMenuClose={handleCloseContextMenu}
            />
          );
        })}
      </div>
    </div>
  );
};
