import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Extend expect matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveStyleRule: (property: string, value: string) => R;
    }
  }
}

// Configure testing library
configure({
  testIdAttribute: 'data-testid',
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;

// Mock ReactFlow's getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 120,
  height: 120,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: () => {}
}));

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = IntersectionObserverMock; 