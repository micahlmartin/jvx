'use client';

import { useCallback, useRef } from 'react';
import { ReactFlowProvider } from 'reactflow';
import styled from 'styled-components';
import { GraphCanvas, GraphCanvasHandle } from '@/components/GraphCanvas';
import { JsonEditor } from '@/components/JsonEditor';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--background);
`;

const EditorPane = styled.div`
  height: 100%;
  border-right: 1px solid var(--node-border);
`;

const GraphPane = styled.div`
  height: 100%;
`;

export default function Home() {
  const graphRef = useRef<GraphCanvasHandle>(null);

  const handleValidJson = useCallback((json: any) => {
    graphRef.current?.updateJson(json);
  }, []);

  return (
    <ReactFlowProvider>
      <Layout>
        <EditorPane>
          <JsonEditor onValidJson={handleValidJson} />
        </EditorPane>
        <GraphPane>
          <GraphCanvas ref={graphRef} />
        </GraphPane>
      </Layout>
    </ReactFlowProvider>
  );
}
