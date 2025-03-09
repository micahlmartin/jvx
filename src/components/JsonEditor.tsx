import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  background: var(--node-bg);
  backdrop-filter: blur(12px);
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid var(--node-border);
  border-radius: 8px;
  resize: none;
  background: rgba(0, 0, 0, 0.2);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
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
  const [jsonText, setJsonText] = useState(JSON.stringify(initialJson, null, 2));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonText);
      setError(null);
      onValidJson?.(parsed);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [jsonText, onValidJson]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setJsonText(newText);
  };

  return (
    <EditorContainer>
      <TextArea
        value={jsonText}
        onChange={handleChange}
        placeholder="Enter JSON here..."
        spellCheck={false}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </EditorContainer>
  );
} 