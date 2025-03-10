'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { sampleOrderData } from '@/data/sampleData';

const Editor = dynamic(() => import('@monaco-editor/react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => (
    <LoadingContainer>Loading editor...</LoadingContainer>
  ),
});

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--node-bg);
  backdrop-filter: blur(12px);
  position: relative;
`;

const LoadingContainer = styled.div`
  position: absolute;
  inset: 0;
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
`;

const EmptyState = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 0 0 48px;
  color: rgba(255, 255, 255, 0.3);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  pointer-events: none;
  user-select: none;
  white-space: pre;
  line-height: 19px;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 12px;
  margin: 8px;
  padding: 8px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
`;

const initialJson = {
  orderId: "ORD-2024-1234",
  orderDate: "2024-03-19T10:30:00Z",
  status: "processing",
  customer: {
    id: "CUST-789",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.j@example.com",
    phone: "+1-555-123-4567",
    address: {
      street: "123 Main Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      country: "USA"
    }
  },
  items: {
    products: [
      {
        id: "PROD-001",
        name: "Mechanical Keyboard",
        price: 149.99,
        quantity: 1,
        category: "Electronics"
      },
      {
        id: "PROD-002",
        name: "27-inch Monitor",
        price: 299.99,
        quantity: 2,
        category: "Electronics"
      }
    ],
    subtotal: 749.97,
    tax: 62.50,
    total: 812.47
  },
  shipping: {
    method: "Express",
    carrier: "FedEx",
    trackingNumber: "FX-987654321",
    estimatedDelivery: "2024-03-22",
    cost: 15.99
  },
  payment: {
    method: "Credit Card",
    status: "completed",
    transactionId: "TXN-456789",
    cardType: "Visa",
    lastFourDigits: "4567",
    billingAddress: {
      sameAsShipping: true
    }
  }
};

export interface JsonEditorProps {
  initialValue?: string;
  onValidJson?: (json: any) => void;
}

export const JsonEditor = ({ initialValue, onValidJson }: JsonEditorProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    // Initialize Monaco theme on the client side
    const initMonaco = async () => {
      const { loader } = await import('@monaco-editor/react');
      const monaco = await loader.init();
      
      monaco.editor.defineTheme('jsonTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#1E1E2E',
          'editor.foreground': '#E4E4E7',
          'editor.lineHighlightBackground': '#ffffff10',
          'editorLineNumber.foreground': '#94A3B8',
          'editorLineNumber.activeForeground': '#E4E4E7',
          'editor.selectionBackground': '#ffffff20',
          'editor.inactiveSelectionBackground': '#ffffff10',
          'editorCursor.foreground': '#E4E4E7',
          'editorBracketMatch.background': '#ffffff20',
          'editorBracketMatch.border': '#ffffff40',
          'editor.findMatchBackground': '#ffffff20',
          'editor.findMatchHighlightBackground': '#ffffff10',
          'editorGutter.background': '#1E1E2E',
          'editorGutter.modifiedBackground': '#3B82F6',
          'editorGutter.addedBackground': '#10B981',
          'editorGutter.deletedBackground': '#EF4444',
        }
      });
    };

    initMonaco();
  }, []);

  const validateAndUpdateJson = useCallback((value: string) => {
    try {
      const parsedJson = JSON.parse(value);
      setError(null);
      onValidJson?.(parsedJson);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return false;
    }
  }, [onValidJson]);

  const handleEditorDidMount = useCallback((editor: any) => {
    setEditor(editor);
    // Apply the theme
    editor.updateOptions({
      theme: 'jsonTheme'
    });
    
    const value = initialValue || JSON.stringify(sampleOrderData, null, 2);
    editor.setValue(value);
    setIsEmpty(!value || value === '{\n    \n}');
    
    if (isEmpty) {
      const position = editor.getPosition();
      editor.setPosition({ lineNumber: 2, column: 5 });
      editor.focus();
    } else {
      validateAndUpdateJson(value);
    }
    
    setIsLoading(false);
  }, [initialValue, isEmpty, validateAndUpdateJson]);

  const handleChange = (value: string | undefined) => {
    if (!value) return;
    validateAndUpdateJson(value);
  };

  return (
    <EditorContainer>
      <Editor
        height="100%"
        defaultLanguage="json"
        options={{
          minimap: { enabled: false },
          lineNumbers: 'on',
          roundedSelection: true,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          folding: true,
          foldingHighlight: true,
          foldingStrategy: 'auto',
          showFoldingControls: 'always',
          matchBrackets: 'always',
          automaticLayout: true,
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true,
        }}
        onChange={handleChange}
        onMount={handleEditorDidMount}
      />
      {isEmpty && !isLoading && (
        <EmptyState>{`{
      start typing here...
}`}</EmptyState>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </EditorContainer>
  );
} 