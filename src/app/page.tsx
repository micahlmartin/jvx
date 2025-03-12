'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

import { GraphCanvas, GraphCanvasHandle } from '@/components/GraphCanvas';
import { JsonEditor } from '@/components/JsonEditor';
import { MenuBar } from '@/components/toolbar/MenuBar';
import { DocumentProvider, useDocuments } from '@/contexts/DocumentContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { sampleOrderData } from '@/data/sampleData';

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
  } = useDocuments();

  useEffect(() => {
    if (!initializeRef.current && documents.length === 0) {
      const defaultDoc = {
        id: uuidv4(),
        name: 'Order Data',
        content: JSON.stringify(sampleOrderData, null, 2),
        isDirty: false,
        type: 'json',
      };
      addDocument(defaultDoc);
      initializeRef.current = true;
    }
  }, [documents.length, addDocument]);

  // Update graph when active document changes or when its name changes
  useEffect(() => {
    if (activeDocument) {
      const activeDoc = documents.find((doc) => doc.id === activeDocument);
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

  const handleValidJson = useCallback(
    (json: Record<string, unknown>) => {
      if (activeDocument) {
        const activeDoc = documents.find((doc) => doc.id === activeDocument);
        if (activeDoc) {
          graphRef.current?.updateJson(json, activeDoc.name);
          updateDocument({
            ...activeDoc,
            content: JSON.stringify(json, null, 2),
            isDirty: true,
          });
        }
      }
    },
    [activeDocument, documents, updateDocument]
  );

  // Get the current document's content
  const currentContent = useMemo(() => {
    if (!activeDocument) return '{}';
    const currentDoc = documents.find((doc) => doc.id === activeDocument);
    return currentDoc?.content || '{}';
  }, [activeDocument, documents]);

  return (
    <ReactFlowProvider>
      <div className="h-[100dvh] w-full overflow-hidden bg-background dark:bg-background-dark relative">
        <div className="h-[45px] w-full border-b border-white/30 flex items-center bg-toolbar-bg dark:bg-toolbar-bg-dark">
          <MenuBar
            documents={documents}
            activeDocument={activeDocument}
            onDocumentSelect={setActiveDocument}
            onDocumentClose={removeDocument}
          />
        </div>
        <div className="h-[calc(100%-45px)] w-full relative flex">
          <JsonEditor
            initialValue={currentContent}
            onValidJson={handleValidJson}
            isCollapsed={!isSidebarVisible}
            defaultSize={400}
            minSize={300}
            maxSize={800}
          />
          <div className="flex-1 relative">
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
