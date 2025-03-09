import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Editor, { Monaco } from '@monaco-editor/react';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--node-bg);
  backdrop-filter: blur(12px);
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
  name: "Example Graph",
  children: [
    {
      name: "Child 1",
      value: 100
    },
    {
      name: "Child 2",
      children: [
        {
          name: "Grandchild 1",
          value: 50
        }
      ]
    }
  ]
};

interface JsonEditorProps {
  onValidJson?: (json: any) => void;
}

export function JsonEditor({ onValidJson }: JsonEditorProps) {
  const [error, setError] = useState<string | null>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    // Configure editor
    monaco.editor.defineTheme('jsonTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#00000000', // Transparent background
        'editor.lineHighlightBackground': '#ffffff10',
        'editorLineNumber.foreground': '#94A3B8',
        'editorLineNumber.activeForeground': '#E4E4E7',
        'editor.selectionBackground': '#ffffff20',
        'editor.inactiveSelectionBackground': '#ffffff10',
      }
    });

    monaco.editor.setTheme('jsonTheme');

    // Set initial value
    editor.setValue(JSON.stringify(initialJson, null, 2));
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
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </EditorContainer>
  );
} 