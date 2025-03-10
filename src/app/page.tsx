'use client';

import { useCallback, useRef, useEffect, useMemo, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import styled from 'styled-components';
import { GraphCanvas, GraphCanvasHandle } from '@/components/GraphCanvas';
import { JsonEditor } from '@/components/JsonEditor';
import { MenuBar } from '@/components/toolbar/MenuBar';
import { TabBar } from '@/components/tabs/TabBar';
import { DocumentProvider, useDocuments } from '@/contexts/DocumentContext';
import { v4 as uuidv4 } from 'uuid';
import { sampleOrderData } from '@/data/sampleData';

interface LayoutProps {
  $isEditorVisible: boolean;
}

interface EditorPaneProps {
  $isVisible: boolean;
}

const Layout = styled.div<LayoutProps>`
  display: grid;
  grid-template-rows: 48px 1fr;
  grid-template-columns: ${props => props.$isEditorVisible ? '400px 1fr' : '0 1fr'};
  height: 100dvh; /* Use dvh for better mobile support */
  width: 100%;
  overflow: hidden;
  background: var(--background);
  transition: grid-template-columns 0.3s ease;
`;

const MenuBarContainer = styled.div`
  grid-column: 1 / -1;
  border-bottom: 1px solid var(--node-border);
  display: flex;
  align-items: center;
  background: #1E1E2E;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  opacity: 0.85;
  transition: all 0.15s ease;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.08);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const MenuSeparator = styled.div`
  width: 1px;
  height: 24px;
  background: currentColor;
  margin: 0 8px;
  opacity: 0.08;
`;

const TabBarContainer = styled.div`
  grid-column: 1 / -1;
`;

const EditorPane = styled.div<EditorPaneProps>`
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--node-border);
  overflow: hidden;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: opacity 0.2s;
  width: ${props => props.$isVisible ? '400px' : '0'};
`;

const GraphPane = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function HomeContent() {
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const graphRef = useRef<GraphCanvasHandle>(null);
  const initializeRef = useRef(false);
  const { 
    documents, 
    activeDocument, 
    addDocument, 
    removeDocument, 
    setActiveDocument, 
    updateDocument, 
    markDocumentDirty 
  } = useDocuments();

  useEffect(() => {
    if (!initializeRef.current && documents.length === 0) {
      const defaultDoc = {
        id: uuidv4(),
        name: 'Order Data',
        content: JSON.stringify(sampleOrderData, null, 2),
        isDirty: false,
        type: 'json'
      };
      addDocument(defaultDoc);
      initializeRef.current = true;
    }
  }, [documents.length, addDocument]);

  // Update graph when active document changes or when its name changes
  useEffect(() => {
    if (activeDocument) {
      const activeDoc = documents.find(doc => doc.id === activeDocument);
      if (activeDoc) {
        try {
          const json = JSON.parse(activeDoc.content);
          graphRef.current?.updateJson(json, activeDoc.name);
        } catch (e) {
          console.error('Failed to parse document content:', e);
        }
      }
    }
  }, [activeDocument, documents]);

  const handleValidJson = useCallback((json: any) => {
    if (activeDocument) {
      const activeDoc = documents.find(doc => doc.id === activeDocument);
      if (activeDoc) {
        graphRef.current?.updateJson(json, activeDoc.name);
        updateDocument({
          ...activeDoc,
          content: JSON.stringify(json, null, 2),
          isDirty: true
        });
      }
    }
  }, [activeDocument, documents, updateDocument]);

  // Get the current document's content
  const currentContent = useMemo(() => {
    if (!activeDocument) return '{}';
    const currentDoc = documents.find(doc => doc.id === activeDocument);
    return currentDoc?.content || '{}';
  }, [activeDocument, documents]);

  return (
    <ReactFlowProvider>
      <Layout $isEditorVisible={isEditorVisible}>
        <MenuBarContainer>
          <ToggleButton
            onClick={() => setIsEditorVisible(!isEditorVisible)}
            aria-label="Toggle panel"
            title="Toggle panel"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H2v12h12V2zM6 2v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ToggleButton>
          <MenuSeparator />
          <MenuBar
            documents={documents}
            activeDocument={activeDocument}
            onDocumentSelect={setActiveDocument}
            onDocumentClose={removeDocument}
          />
        </MenuBarContainer>
        <EditorPane $isVisible={isEditorVisible}>
          <JsonEditor 
            onValidJson={handleValidJson}
            key={activeDocument || 'empty'}
            initialValue={currentContent}
          />
        </EditorPane>
        <GraphPane>
          <GraphCanvas ref={graphRef} />
        </GraphPane>
      </Layout>
    </ReactFlowProvider>
  );
}

export default function Home() {
  return (
    <DocumentProvider>
      <HomeContent />
    </DocumentProvider>
  );
}
