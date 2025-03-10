'use client';

import { useCallback, useRef, useEffect, useMemo } from 'react';
import { ReactFlowProvider } from 'reactflow';
import styled from 'styled-components';
import { GraphCanvas, GraphCanvasHandle } from '@/components/GraphCanvas';
import { JsonEditor } from '@/components/JsonEditor';
import { MenuBar } from '@/components/toolbar/MenuBar';
import { TabBar } from '@/components/tabs/TabBar';
import { DocumentProvider, useDocuments } from '@/contexts/DocumentContext';
import { v4 as uuidv4 } from 'uuid';

const Layout = styled.div`
  display: grid;
  grid-template-rows: 40px 1fr;
  grid-template-columns: 400px 1fr;
  height: 100dvh; /* Use dvh for better mobile support */
  width: 100%;
  overflow: hidden;
  background: var(--background);
`;

const MenuBarContainer = styled.div`
  grid-column: 1 / -1;
  border-bottom: 1px solid var(--node-border);
`;

const TabBarContainer = styled.div`
  grid-column: 1 / -1;
`;

const EditorPane = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--node-border);
  overflow: hidden;
`;

const GraphPane = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function HomeContent() {
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
        content: JSON.stringify({
          orderId: "ORD-2024-1234",
          orderDate: "2024-03-19T10:30:00Z",
          status: "processing",
          customer: {
            id: "CUST-789",
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice.j@example.com"
          }
        }, null, 2),
        isDirty: false,
        type: 'json'
      };
      addDocument(defaultDoc);
      initializeRef.current = true;
    }
  }, [documents.length, addDocument]);

  const handleValidJson = useCallback((json: any) => {
    graphRef.current?.updateJson(json);
    
    if (activeDocument) {
      const activeDoc = documents.find(doc => doc.id === activeDocument);
      if (activeDoc) {
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
      <Layout>
        <MenuBarContainer>
          <MenuBar
            documents={documents}
            activeDocument={activeDocument}
            onDocumentSelect={setActiveDocument}
            onDocumentClose={removeDocument}
          />
        </MenuBarContainer>
        <EditorPane>
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
