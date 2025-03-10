'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { sampleOrderData } from '@/data/sampleData';

const Editor = dynamic(() => import('@monaco-editor/react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-background flex items-center justify-center text-[rgba(255,255,255,0.5)] font-mono text-property">
      Loading editor...
    </div>
  ),
});

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
    <div className="flex flex-col h-full bg-node-bg backdrop-blur-node relative">
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
        <div className="absolute top-0 left-0 right-0 pt-4 pl-12 text-[rgba(255,255,255,0.3)] font-mono text-property pointer-events-none select-none whitespace-pre leading-[19px]">
          {`{
      start typing here...
}`}
        </div>
      )}
      {error && (
        <div className="text-[#ef4444] text-type m-2 p-2 bg-[rgba(239,68,68,0.1)] rounded-badge font-mono">
          {error}
        </div>
      )}
    </div>
  );
} 