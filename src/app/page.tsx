'use client';

import { ReactFlowProvider } from 'reactflow';
import { GraphCanvas } from '@/components/GraphCanvas';

export default function Home() {
  return (
    <main>
      <ReactFlowProvider>
        <GraphCanvas />
      </ReactFlowProvider>
    </main>
  );
}
