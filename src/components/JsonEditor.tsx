'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { sampleOrderData } from '@/data/sampleData';
import { useTheme } from '@/contexts/ThemeContext';
import { vsDarkPlus } from '@/themes/vs-dark-plus';

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

  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    setEditor(editor);
    
    // Define editor options
    editor.updateOptions({
      fontFamily: 'JetBrains Mono',
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: 0.5,
      minimap: {
        enabled: false
      },
      scrollBeyondLastLine: false,
      renderLineHighlight: 'all',
      cursorBlinking: 'smooth',
      cursorStyle: 'line',
      cursorWidth: 2,
      smoothScrolling: true,
      fontLigatures: true,
      theme: theme === 'dark' ? 'vs-dark-plus' : 'light'
    });

    // Set up the editor
    monaco.editor.defineTheme('vs-dark-plus', vsDarkPlus);
    monaco.editor.setTheme(theme === 'dark' ? 'vs-dark-plus' : 'light');
    
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
  }, [initialValue, isEmpty, validateAndUpdateJson, theme]);

  // Update theme when it changes
  useEffect(() => {
    if (editor) {
      editor.updateOptions({
        theme: theme === 'dark' ? 'vs-dark-plus' : 'light'
      });
    }
  }, [theme, editor]);

  // Update editor content when initialValue changes
  useEffect(() => {
    if (editor && initialValue !== undefined) {
      const currentValue = editor.getValue();
      if (currentValue !== initialValue) {
        const position = editor.getPosition();
        editor.setValue(initialValue);
        if (position) {
          editor.setPosition(position);
        }
        setIsEmpty(!initialValue || initialValue === '{\n    \n}');
        try {
          JSON.parse(initialValue);
          setError(null);
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          }
        }
      }
    }
  }, [editor, initialValue]);

  const handleChange = (value: string | undefined) => {
    if (!value) return;
    validateAndUpdateJson(value);
  };

  return (
    <div className="flex flex-col h-full bg-node-bg backdrop-blur-node relative">
      <Editor
        height="100%"
        defaultLanguage="json"
        theme={theme === 'dark' ? 'vs-dark-plus' : 'light'}
        options={{
          minimap: { enabled: false },
          lineNumbers: 'on',
          roundedSelection: false,
          padding: { top: 0, bottom: 0 },
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
          renderLineHighlight: 'none',
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          guides: {
            indentation: false
          },
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12,
            useShadows: false
          }
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
}; 