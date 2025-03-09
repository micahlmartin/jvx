import { useState, useCallback } from 'react';
import styled from 'styled-components';

const EditorContainer = styled.div`
  background: var(--node-bg);
  backdrop-filter: blur(12px);
  border-right: 1px solid var(--node-border);
  padding: 16px;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EditorHeader = styled.div`
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
`;

const TextArea = styled.textarea`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--node-border);
  border-radius: 8px;
  color: var(--text-value);
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  padding: 12px;
  resize: none;
  flex: 1;
  outline: none;
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 12px;
  padding: 8px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
`;

interface JsonEditorProps {
  onValidJson: (json: any) => void;
}

const sampleJson = {
  name: "John Doe",
  age: 30,
  active: true,
  hobbies: ["reading", "coding", "gaming"],
  address: {
    street: "123 Main St",
    city: "Example City",
    zipCode: "12345"
  }
};

export function JsonEditor({ onValidJson }: JsonEditorProps) {
  const [jsonText, setJsonText] = useState(JSON.stringify(sampleJson, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setJsonText(newText);
    
    try {
      const parsed = JSON.parse(newText);
      setError(null);
      onValidJson(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  }, [onValidJson]);

  return (
    <EditorContainer>
      <EditorHeader>JSON Input</EditorHeader>
      <TextArea 
        value={jsonText}
        onChange={handleChange}
        spellCheck={false}
        placeholder="Enter JSON here..."
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </EditorContainer>
  );
} 