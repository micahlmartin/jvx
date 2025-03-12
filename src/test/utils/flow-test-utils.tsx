import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { render, RenderOptions } from '@testing-library/react';

// Custom renderer that wraps components with ReactFlow provider
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <ReactFlowProvider>{children}</ReactFlowProvider>
    ),
    ...options,
  });
};

// Helper to create a mock node
const createMockNode = (id: string, data: Record<string, unknown> = {}) => ({
  id,
  type: 'object',
  position: { x: 0, y: 0 },
  data,
});

// Helper to get computed styles including pseudo-elements
const getComputedStyle = (element: HTMLElement, pseudo?: string) => {
  return window.getComputedStyle(element, pseudo);
};

// Helper to check handle positioning
const checkHandlePosition = (handle: HTMLElement, position: 'left' | 'right') => {
  const styles = getComputedStyle(handle);
  return {
    position: styles.position,
    [position]: styles[position],
    transform: styles.transform,
  };
};

// Helper to check separator styling
const checkSeparatorStyling = (row: HTMLElement) => {
  const afterStyles = getComputedStyle(row, ':after');
  return {
    content: afterStyles.content,
    position: afterStyles.position,
    background: afterStyles.background,
  };
};

export {
  customRender as render,
  createMockNode,
  getComputedStyle,
  checkHandlePosition,
  checkSeparatorStyling,
}; 