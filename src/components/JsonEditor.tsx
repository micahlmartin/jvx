'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { sampleOrderData } from '@/data/sampleData';
import { useTheme } from '@/contexts/ThemeContext';
import { vsDarkPlus } from '@/themes/vs-dark-plus';
import { ResizablePanel } from './ResizablePanel';
import { PANEL_SIZES } from '@/constants/panels';
import type * as Monaco from 'monaco-editor';

// Dynamically import monaco-editor
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
  isCollapsed?: boolean;
  onResize?: (size: number) => void;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  title?: string;
}

export const JsonEditor = ({ 
  initialValue, 
  onValidJson, 
  isCollapsed = false, 
  onResize,
  defaultSize = PANEL_SIZES.DEFAULT_SIZE,
  minSize = PANEL_SIZES.MIN_SIZE,
  maxSize = PANEL_SIZES.MAX_SIZE,
  title = 'Order Data'
}: JsonEditorProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [editor, setEditor] = useState<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const [monacoInstance, setMonacoInstance] = useState<typeof Monaco | null>(null);
  const { theme } = useTheme();

  const validateAndUpdateJson = useCallback((value: string) => {
    // Check if it's our initial empty template
    if (value === '{\n    \n}') {
      setIsEmpty(true);
      setError(null);
      if (editor && monacoInstance) {
        const model = editor.getModel();
        if (model) {
          editor.getModel()?.deltaDecorations([], []);
          monacoInstance.editor.setModelMarkers(model, 'json', []);
        }
      }
      return true;
    }

    // If it's just whitespace or empty, don't validate
    if (!value.trim()) {
      setIsEmpty(true);
      setError(null);
      return true;
    }

    setIsEmpty(false);
    try {
      // Only parse to validate, don't format or modify the content
      JSON.parse(value);
      setError(null);
      
      // Clear error markers when JSON is valid
      if (editor && monacoInstance) {
        const model = editor.getModel();
        if (model) {
          editor.getModel()?.deltaDecorations([], []);
          monacoInstance.editor.setModelMarkers(model, 'json', []);
        }
      }
      return true;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        
        // Add error markers to the overview ruler
        if (editor && monacoInstance) {
          const model = editor.getModel();
          if (model) {
            const lineNumber = getErrorLineNumber(e.message, model);
            monacoInstance.editor.setModelMarkers(model, 'json', [{
              severity: monacoInstance.MarkerSeverity.Error,
              message: e.message,
              startLineNumber: lineNumber,
              startColumn: 1,
              endLineNumber: lineNumber,
              endColumn: model.getLineLength(lineNumber) + 1
            }]);
          }
        }
      }
      return false;
    }
  }, [editor, monacoInstance]);

  // Helper function to extract line number from JSON error message
  const getErrorLineNumber = (errorMessage: string, model: Monaco.editor.ITextModel): number => {
    const match = errorMessage.match(/at position (\d+)/);
    if (match) {
      const position = parseInt(match[1], 10);
      return model.getPositionAt(position).lineNumber;
    }
    return 1;
  };

  const handleEditorDidMount = useCallback((editorInstance: Monaco.editor.IStandaloneCodeEditor, monaco: any) => {
    setEditor(editorInstance);
    setMonacoInstance(monaco);
    
    // Configure editor with overview ruler options
    editorInstance.updateOptions({
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
      theme: theme === 'dark' ? 'vs-dark-plus' : 'light',
      overviewRulerLanes: 3,
      overviewRulerBorder: true,
      hideCursorInOverviewRuler: false,
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        verticalScrollbarSize: 14,
        horizontalScrollbarSize: 14,
        verticalSliderSize: 14,
        horizontalSliderSize: 14,
        alwaysConsumeMouseWheel: false,
        useShadows: true
      },
      formatOnPaste: false,
      formatOnType: false,
      autoIndent: 'none',
      autoClosingBrackets: 'never',
      autoClosingQuotes: 'never'
    });

    // Set up the editor
    monaco.editor.defineTheme('vs-dark-plus', vsDarkPlus);
    monaco.editor.setTheme(theme === 'dark' ? 'vs-dark-plus' : 'light');
    
    const value = initialValue || JSON.stringify(sampleOrderData, null, 2);
    editorInstance.setValue(value);
    
    // Check if it's our initial empty template
    const isEmptyJson = value === '{\n    \n}';
    setIsEmpty(isEmptyJson);
    
    if (isEmptyJson) {
      editorInstance.setValue('{\n    \n}');
      editorInstance.setPosition({ lineNumber: 2, column: 5 });
      editorInstance.focus();
    } else {
      validateAndUpdateJson(value);
    }

    // Add content change listener for validation with debounce
    let validateTimeout: NodeJS.Timeout;
    editorInstance.onDidChangeModelContent(() => {
      const currentValue = editorInstance.getValue();
      
      // Clear previous timeout
      if (validateTimeout) {
        clearTimeout(validateTimeout);
      }
      
      // Set new timeout for validation
      validateTimeout = setTimeout(() => {
        validateAndUpdateJson(currentValue);
      }, 300); // Validate after 300ms of no typing
    });
    
    setIsLoading(false);

    // Cleanup timeout on unmount
    return () => {
      if (validateTimeout) {
        clearTimeout(validateTimeout);
      }
    };
  }, [initialValue, validateAndUpdateJson, theme]);

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
        validateAndUpdateJson(initialValue);
      }
    }
  }, [editor, initialValue, validateAndUpdateJson]);

  const handleChange = (value: string | undefined) => {
    if (!value) return;
    validateAndUpdateJson(value);
  };

  return (
    <ResizablePanel
      isCollapsed={isCollapsed}
      onResize={onResize}
      defaultSize={defaultSize}
      minSize={minSize}
      maxSize={maxSize}
      className="bg-node-bg backdrop-blur-node relative"
    >
      <div className="h-full w-full flex flex-col">
        <Editor
          height="calc(100% - 22px)"
          width="100%"
          defaultLanguage="json"
          value={initialValue}
          onChange={handleChange}
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
            hideCursorInOverviewRuler: false,
            overviewRulerBorder: true,
            overviewRulerLanes: 3,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 14,
              horizontalScrollbarSize: 14,
              verticalSliderSize: 14,
              horizontalSliderSize: 14,
              alwaysConsumeMouseWheel: false,
              useShadows: true
            },
            guides: {
              indentation: false
            }
          }}
          onMount={handleEditorDidMount}
        />
        {isEmpty && !isLoading && (
          <div className="absolute top-0 left-0 right-[14px] pt-4 pl-12 text-editor-text-placeholder dark:text-editor-text-placeholder-dark font-mono text-property pointer-events-none select-none whitespace-pre leading-[19px]">
            {`{
      start typing here...
}`}
          </div>
        )}
        <div className="h-[22px] flex items-center justify-between px-2 text-xs font-[system-ui,-apple-system,BlinkMacSystemFont,Segoe_UI,sans-serif] bg-editor-statusbar dark:bg-editor-statusbar-dark text-[#9D9D9D] dark:text-[#9D9D9D] border-t border-editor-statusbar-border dark:border-editor-statusbar-border-dark">
          <div className="flex items-center gap-1.5 group relative">
            {error ? (
              <>
                <svg className="w-3.5 h-3.5 text-[#F14C4C]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <span className="text-[#F14C4C] font-normal">Invalid</span>
                <div className="invisible group-hover:visible absolute bottom-[22px] left-2 mb-1 w-[480px] p-2 text-xs bg-[#252526] dark:bg-[#252526] text-[#CCCCCC] dark:text-[#CCCCCC] rounded-md shadow-lg break-words whitespace-pre-wrap border border-[#454545] dark:border-[#454545]">
                  {error}
                </div>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-[#4EC9B0]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" fill="currentColor"/>
                </svg>
                <span className="text-[#4EC9B0] font-normal">Valid</span>
              </>
            )}
          </div>
          <button 
            className="px-2 py-0.5 text-[#9D9D9D] dark:text-[#9D9D9D] hover:bg-[#2A2D2E] dark:hover:bg-[#2A2D2E] rounded transition-colors font-normal"
            onClick={() => {
              const model = editor?.getModel();
              if (model) {
                const value = model.getValue();
                try {
                  const formatted = JSON.stringify(JSON.parse(value), null, 2);
                  const position = editor?.getPosition();
                  model.setValue(formatted);
                  if (position) {
                    editor?.setPosition(position);
                  }
                } catch (e) {
                  // If JSON is invalid, do nothing
                }
              }
            }}
          >
            Format
          </button>
        </div>
      </div>
    </ResizablePanel>
  );
}; 