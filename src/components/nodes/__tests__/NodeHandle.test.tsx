import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Position } from 'reactflow';
import { NodeHandle } from '../NodeHandle';
import { designSystem } from '../../../styles/design-system';

describe('NodeHandle', () => {
  describe('Visibility Rules', () => {
    it('should render target handle with opacity 0 by default', () => {
      const { container } = render(
        <NodeHandle
          type="target"
          position={Position.Left}
        />
      );
      
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveStyle({
        opacity: '0',
        pointerEvents: 'none'
      });
    });

    it('should render source handle with opacity 1 by default', () => {
      const { container } = render(
        <NodeHandle
          type="source"
          position={Position.Left}
        />
      );
      
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveStyle({
        opacity: '1',
        pointerEvents: 'all'
      });
    });

    it('should render source handle with opacity 0 when not visible', () => {
      const { container } = render(
        <NodeHandle
          type="source"
          position={Position.Left}
          isVisible={false}
        />
      );
      
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveStyle({
        opacity: '0',
        pointerEvents: 'none'
      });
    });
  });

  describe('Positioning', () => {
    it('should position handle on the left', () => {
      const { container } = render(
        <NodeHandle
          type="source"
          position={Position.Left}
        />
      );
      
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveStyle({
        left: '0',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      });
    });

    it('should position handle on the right', () => {
      const { container } = render(
        <NodeHandle
          type="source"
          position={Position.Right}
        />
      );
      
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveStyle({
        right: '0',
        top: '50%',
        transform: 'translate(50%, -50%)'
      });
    });
  });

  describe('Styling', () => {
    it('should use correct size from design system', () => {
      const { container } = render(
        <NodeHandle
          type="source"
          position={Position.Right}
        />
      );
      
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveStyle({
        width: designSystem.handles.size.width,
        height: designSystem.handles.size.height
      });
    });

    it('should use correct colors from design system', () => {
      const { container } = render(
        <NodeHandle
          type="source"
          position={Position.Right}
        />
      );
      
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveStyle({
        background: designSystem.handles.colors.default
      });
    });
  });

  describe('Interaction Behavior', () => {
    it('should have pointer-events: none when target handle and not connecting', () => {
      const { container } = render(
        <NodeHandle
          type="target"
          position={Position.Left}
        />
      );
      
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveStyle({
        'pointer-events': 'none'
      });
    });

    it('should have pointer-events: all when source handle and visible', () => {
      const { container } = render(
        <NodeHandle
          type="source"
          position={Position.Right}
          isVisible={true}
        />
      );
      
      const handle = container.firstChild as HTMLElement;
      expect(handle).toHaveStyle({
        'pointer-events': 'all'
      });
    });
  });

  describe('Visual Regression', () => {
    it('should match snapshot for target handle', () => {
      const { container } = render(
        <NodeHandle
          type="target"
          position={Position.Left}
        />
      );
      
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot for source handle', () => {
      const { container } = render(
        <NodeHandle
          type="source"
          position={Position.Right}
          isVisible={true}
        />
      );
      
      expect(container.firstChild).toMatchSnapshot();
    });
  });
}); 