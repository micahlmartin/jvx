'use client';

import { useCallback, useRef } from 'react';
import { ReactFlowProvider } from 'reactflow';
import styled from 'styled-components';
import { GraphCanvas, GraphCanvasHandle } from '@/components/GraphCanvas';
import { JsonEditor } from '@/components/JsonEditor';
import { MenuBar } from '@/components/toolbar/MenuBar';

const Layout = styled.div`
  display: grid;
  grid-template-rows: 40px 1fr;
  grid-template-columns: 400px 1fr;
  height: 100dvh; /* Use dvh for better mobile support */
  width: 100%;
  overflow: hidden;
  background: var(--background);
`;

const MenuBarContainer = styled.div`
  grid-column: 1 / -1;
  border-bottom: 1px solid var(--node-border);
`;

const EditorPane = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--node-border);
  overflow: hidden;
`;

const GraphPane = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default function Home() {
  const graphRef = useRef<GraphCanvasHandle>(null);

  const handleValidJson = useCallback((json: any) => {
    graphRef.current?.updateJson(json);
  }, []);

  return (
    <ReactFlowProvider>
      <Layout>
        <MenuBarContainer>
          <MenuBar />
        </MenuBarContainer>
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
