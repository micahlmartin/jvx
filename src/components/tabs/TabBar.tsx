import React from 'react';
import styled from 'styled-components';
import { designSystem } from '@/styles/design-system';
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

const TabBarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  background: var(--background);
  border-bottom: 1px solid var(--node-border);
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabList = styled.div`
  display: flex;
  height: 100%;
`;

export const TabBar: React.FC<TabBarProps> = ({
  documents,
  activeDocument,
  onDocumentSelect,
  onDocumentClose
}) => {
  return (
    <TabBarContainer role="tablist" aria-label="Open documents">
      <TabList>
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
      </TabList>
    </TabBarContainer>
  );
}; 