'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { sampleOrderData } from '@/data/sampleData';
import { colors } from '@/styles/colors';
import { useTheme } from '@/contexts/ThemeContext';

const Editor = dynamic(() => import('@monaco-editor/react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-background flex items-center justify-center text-editor-text-placeholder dark:text-editor-text-placeholder-dark font-mono text-property">
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
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize Monaco theme on the client side
    const initMonaco = async () => {
      const { loader } = await import('@monaco-editor/react');
      const monaco = await loader.init();
      
      monaco.editor.defineTheme('jsonTheme', {
        base: theme === 'dark' ? 'vs-dark' : 'vs',
        inherit: true,
        rules: [
          { token: 'string', foreground: theme === 'dark' ? '38BDF8' : '0284C7' },
          { token: 'number', foreground: theme === 'dark' ? 'EC4899' : 'DB2777' },
          { token: 'string.key.json', foreground: theme === 'dark' ? '94A3B8' : '475569' },
          { token: 'operator', foreground: theme === 'dark' ? 'E4E4E7' : '1A1A1A' },
          { token: 'delimiter', foreground: theme === 'dark' ? 'E4E4E7' : '1A1A1A' },
          { token: 'delimiter.bracket', foreground: theme === 'dark' ? 'E4E4E7' : '1A1A1A' }
        ],
        colors: {
          'editor.background': theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          'editor.foreground': theme === 'dark' ? colors.editor.text.dark : colors.editor.text.DEFAULT,
          'editor.lineHighlightBackground': theme === 'dark' ? '#282828' : '#F8F9FA',
          'editor.lineHighlightBorder': theme === 'dark' ? '#282828' : '#F8F9FA',
          'editorLineNumber.foreground': theme === 'dark' ? colors.editor.text.muted.dark : colors.editor.text.muted.DEFAULT,
          'editorLineNumber.activeForeground': theme === 'dark' ? colors.editor.text.dark : colors.editor.text.DEFAULT,
          'editor.selectionBackground': theme === 'dark' ? '#264F78' : '#ADD6FF',
          'editor.inactiveSelectionBackground': theme === 'dark' ? '#3A3D41' : '#E5EBF1',
          'editor.selectionHighlightBackground': theme === 'dark' ? '#37373D' : '#E5EBF1',
          'editor.wordHighlightBackground': theme === 'dark' ? '#575757' : '#E5EBF1',
          'editor.wordHighlightStrongBackground': theme === 'dark' ? '#004972' : '#ADD6FF',
          'editorCursor.foreground': theme === 'dark' ? colors.editor.text.dark : colors.editor.text.DEFAULT,
          'editorBracketMatch.background': theme === 'dark' ? '#2D2D2D' : '#F1F5F9',
          'editorBracketMatch.border': theme === 'dark' ? '#2D2D2D' : '#F1F5F9',
          'editor.findMatchBackground': theme === 'dark' ? '#515C6A' : '#A8AC94',
          'editor.findMatchHighlightBackground': theme === 'dark' ? '#3A3D41' : '#E5EBF1',
          'editorGutter.background': theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          'editorGutter.modifiedBackground': colors.editor.gutter.modified,
          'editorGutter.addedBackground': colors.editor.gutter.added,
          'editorGutter.deletedBackground': colors.editor.gutter.deleted,
        }
      });
    };

    initMonaco();
  }, [theme]);

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
          bracketPairColorization: {
            enabled: false
          },
          automaticLayout: true,
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true,
        }}
        onChange={handleChange}
        onMount={handleEditorDidMount}
      />
      {isEmpty && !isLoading && (
        <div className="absolute top-0 left-0 right-0 pt-4 pl-12 text-editor-text-placeholder dark:text-editor-text-placeholder-dark font-mono text-property pointer-events-none select-none whitespace-pre leading-[19px]">
          {`{
      start typing here...
}`}
        </div>
      )}
      {error && (
        <div className="text-editor-error-text text-type m-2 p-2 bg-editor-error-bg rounded-badge font-mono">
          {error}
        </div>
      )}
    </div>
  );
} 