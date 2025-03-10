'use client';

import { useCallback, useRef, useEffect, useMemo, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { GraphCanvas, GraphCanvasHandle } from '@/components/GraphCanvas';
import { JsonEditor } from '@/components/JsonEditor';
import { MenuBar } from '@/components/toolbar/MenuBar';
import { TabBar } from '@/components/tabs/TabBar';
import { DocumentProvider, useDocuments } from '@/contexts/DocumentContext';
import { v4 as uuidv4 } from 'uuid';
import { sampleOrderData } from '@/data/sampleData';

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
      <div className={`grid grid-rows-[48px_1fr] h-[100dvh] w-full overflow-hidden bg-background transition-[grid-template-columns] duration-300 ease-in-out ${isEditorVisible ? 'grid-cols-[400px_1fr]' : 'grid-cols-[0_1fr]'}`}>
        <div className="col-span-full border-b border-node-border flex items-center bg-[#1E1E2E]">
          <button
            onClick={() => setIsEditorVisible(!isEditorVisible)}
            aria-label="Toggle panel"
            title="Toggle panel"
            className="flex items-center justify-center w-12 h-12 border-none bg-transparent text-text-primary cursor-pointer opacity-85 transition-all duration-150 hover:opacity-100 hover:bg-[rgba(255,255,255,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H2v12h12V2zM6 2v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="w-[1px] h-6 bg-current mx-2 opacity-[0.08]" />
          <MenuBar
            documents={documents}
            activeDocument={activeDocument}
            onDocumentSelect={setActiveDocument}
            onDocumentClose={removeDocument}
          />
        </div>
        <div className={`flex flex-col border-r border-node-border overflow-hidden transition-[opacity,width] duration-200 ${isEditorVisible ? 'opacity-100 w-[400px]' : 'opacity-0 w-0'}`}>
          <JsonEditor 
            onValidJson={handleValidJson}
            key={activeDocument || 'empty'}
            initialValue={currentContent}
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <GraphCanvas ref={graphRef} />
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
