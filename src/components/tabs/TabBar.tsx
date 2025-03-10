import React from 'react';
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
}

export const TabBar: React.FC<TabBarProps> = ({
  documents,
  activeDocument,
  onDocumentSelect,
  onDocumentClose
}) => {
  return (
    <div 
      role="tablist" 
      aria-label="Open documents"
      className="flex items-center h-8 bg-background border-b border-node-border overflow-x-auto scrollbar-none"
    >
      <div className="flex h-full">
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
      </div>
    </div>
  );
}; 