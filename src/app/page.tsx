'use client';

import { useCallback, useRef, useEffect, useMemo } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { GraphCanvas, GraphCanvasHandle } from '@/components/GraphCanvas';
import { JsonEditor } from '@/components/JsonEditor';
import { MenuBar } from '@/components/toolbar/MenuBar';
import { TabBar } from '@/components/tabs/TabBar';
import { DocumentProvider, useDocuments } from '@/contexts/DocumentContext';
import { v4 as uuidv4 } from 'uuid';
import { sampleOrderData } from '@/data/sampleData';
import { useSidebar } from '@/contexts/SidebarContext';

function HomeContent() {
  const { isSidebarVisible } = useSidebar();
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
      <div className="h-[100dvh] w-full overflow-hidden bg-background dark:bg-background-dark relative">
        <div className="h-[38px] w-full border-b border-node-border dark:border-node-border-dark flex items-center bg-background dark:bg-background-dark">
          <MenuBar
            documents={documents}
            activeDocument={activeDocument}
            onDocumentSelect={setActiveDocument}
            onDocumentClose={removeDocument}
          />
        </div>
        <div className="h-[calc(100%-38px)] w-full relative">
          <div 
            className={`absolute top-0 left-0 h-full w-[400px] border-r border-node-border dark:border-node-border-dark bg-background dark:bg-background-dark transition-transform duration-300 ease-in-out z-10 ${
              isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <JsonEditor
              initialValue={currentContent}
              onValidJson={handleValidJson}
            />
          </div>
          <div 
            className={`absolute top-0 right-0 h-full transition-[width,left] duration-300 ease-in-out ${
              isSidebarVisible ? 'left-[400px] w-[calc(100%-400px)]' : 'left-0 w-full'
            }`}
          >
            <GraphCanvas ref={graphRef} />
          </div>
        </div>
      </div>
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
