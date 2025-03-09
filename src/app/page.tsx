'use client';

import { useCallback, useRef } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { GraphCanvas } from '@/components/GraphCanvas';
import { JsonEditor } from '@/components/JsonEditor';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  height: 100vh;
  background-color: var(--background);
`;

export default function Home() {
  const graphRef = useRef<{ updateJson: (json: any) => void }>();

  const handleValidJson = useCallback((json: any) => {
    graphRef.current?.updateJson(json);
  }, []);

  return (
    <Layout>
      <ReactFlowProvider>
        <JsonEditor onValidJson={handleValidJson} />
        <GraphCanvas ref={graphRef} />
      </ReactFlowProvider>
    </Layout>
  );
}
