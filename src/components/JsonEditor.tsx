import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Editor, { Monaco, loader } from '@monaco-editor/react';

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

// Pre-load Monaco editor
loader.init().then(monaco => {
  monaco.editor.defineTheme('jsonTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#00000000',
      'editor.lineHighlightBackground': '#ffffff10',
      'editorLineNumber.foreground': '#94A3B8',
      'editorLineNumber.activeForeground': '#E4E4E7',
      'editor.selectionBackground': '#ffffff20',
      'editor.inactiveSelectionBackground': '#ffffff10',
    }
  });
});

interface JsonEditorProps {
  onValidJson?: (json: any) => void;
  initialValue?: string;
}

export function JsonEditor({ onValidJson, initialValue }: JsonEditorProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [editor, setEditor] = useState<any>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    monaco.editor.setTheme('jsonTheme');
    setEditor(editor);
    
    const emptyValue = '{\n    \n}';
    editor.setValue(emptyValue);
    setIsLoading(false);
    setIsEmpty(true);

    editor.setPosition({ lineNumber: 2, column: 5 });
    editor.focus();

    editor.onDidChangeModelContent(() => {
      const currentValue = editor.getValue().trim();
      setIsEmpty(currentValue === '{\n    \n}' || currentValue === '{}');
    });
  };

  const handleChange = (value: string | undefined) => {
    if (!value) return;
    
    try {
      const parsed = JSON.parse(value);
      setError(null);
      onValidJson?.(parsed);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
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
        loading={<LoadingContainer>Loading editor...</LoadingContainer>}
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