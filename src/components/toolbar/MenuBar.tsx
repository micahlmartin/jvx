import React from 'react';
import { FileMenu } from './menus/FileMenu';
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
      className="bg-[#1E1E2E] h-12 flex items-center z-[var(--z-index-node-base)] border-b border-[rgba(255,255,255,0.08)]"
    >
      <div className="flex items-center p-0 pr-3 h-full gap-1.5 border-r border-[rgba(255,255,255,0.08)]">
        <FileMenu
          onNewFile={handleNewFile}
          onOpenFile={handleOpenFile}
          onSaveFile={handleSaveFile}
          onSaveAs={handleSaveAs}
        />
        <button 
          role="menuitem" 
          aria-haspopup="true"
          className="text-text-primary text-sm px-4 bg-transparent border-none cursor-pointer transition-all duration-150 flex items-center h-full gap-1 opacity-85 font-normal hover:bg-[rgba(255,255,255,0.08)] hover:opacity-100 focus:outline-none"
        >
          View
        </button>
        <button 
          role="menuitem" 
          aria-haspopup="true"
          className="text-text-primary text-sm px-4 bg-transparent border-none cursor-pointer transition-all duration-150 flex items-center h-full gap-1 opacity-85 font-normal hover:bg-[rgba(255,255,255,0.08)] hover:opacity-100 focus:outline-none"
        >
          Edit
        </button>
      </div>
      <div 
        role="tablist" 
        aria-label="Open documents"
        className="flex items-center flex-1 h-full overflow-x-auto scrollbar-none gap-0.5 pl-4"
      >
        {documents.map(doc => (
          <Tab
            key={doc.id}
            id={doc.id}
            name={doc.name}
            isActive={doc.id === activeDocument}
            isDirty={doc.isDirty}
            onActivate={() => onDocumentSelect(doc.id)}
            onClose={() => onDocumentClose(doc.id)}
            onRename={renameDocument}
          />
        ))}
        <button
          onClick={handleNewFile}
          aria-label="Create new document"
          title="Create new document"
          className="flex items-center justify-center w-10 h-full bg-transparent border-none text-text-primary cursor-pointer opacity-70 text-[22px] transition-all duration-150 hover:opacity-100 hover:bg-[rgba(255,255,255,0.08)] focus:outline-none"
        >
          +
        </button>
      </div>
    </div>
  );
}; 