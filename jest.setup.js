import '@testing-library/jest-dom';
import 'jest-styled-components';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import React from 'react';

expect.extend({ toMatchImageSnapshot });

// Add custom matchers
expect.extend({
  toHaveStyleRule(received, property, value, options = {}) {
    const { modifier } = options;
    return {
      pass: received.hasStyleRule(property, value, modifier),
      message: () =>
        `expected ${received} ${this.isNot ? 'not ' : ''}to have CSS property "${property}" with value "${value}"${
          modifier ? ` and modifier "${modifier}"` : ''
        }`,
    };
  },
});

// Mock ReactFlow
jest.mock('reactflow', () => ({
  ...jest.requireActual('reactflow'),
  Handle: ({ type, position, isConnectable, ...props }) => {
    const style = {
      opacity: type === 'target' ? '0' : '1',
      pointerEvents: type === 'target' ? 'none' : 'all',
      ...props.style
    };
    return <div data-testid={`handle-${type}`} {...props} style={style} />;
  },
  Position: {
    Left: 'left',
    Right: 'right',
    Top: 'top',
    Bottom: 'bottom',
  },
  useStore: jest.fn(() => ({
    connectionNodeId: null,
  })),
}));

// Setup global test environment
beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}); 