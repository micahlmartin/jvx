import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Position,
  MarkerType,
  DefaultEdgeOptions,
  BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import { ObjectNode, ObjectNodeData } from './nodes';
import ArrayNode from './nodes/ArrayNode';
import ValueNode from './nodes/ValueNode';
import { jsonToGraph } from '@/utils/jsonToGraph';
import { sampleOrderData } from '@/data/sampleData';

const GraphContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--background);
`;

const nodeTypes = {
  object: ObjectNode,
  array: ArrayNode,
  value: ValueNode,
} as const;

interface NodeWithDepth extends Node {
  depth?: number;
}

const COLUMN_GAP = 80;    // Fixed gap between columns
const VERTICAL_SPACING = 40;
const COLUMN_PADDING = 50;
const TOP_PADDING = 40;

const calculateNodeDepths = (nodes: Node[], edges: Edge[]): Map<string, number> => {
  const depths = new Map<string, number>();
  const parentMap = new Map<string, string>();
  
  // Build parent map
  edges.forEach(edge => {
    parentMap.set(edge.target, edge.source);
  });
  
  // Find root nodes (nodes with no parents)
  const rootNodes = nodes.filter(node => !parentMap.has(node.id));
  
  // Recursive function to set depths
  const setDepth = (nodeId: string, depth: number) => {
    depths.set(nodeId, depth);
    
    // Find children and set their depths
    edges
      .filter(edge => edge.source === nodeId)
      .forEach(edge => {
        setDepth(edge.target, depth + 1);
      });
  };
  
  // Start from root nodes
  rootNodes.forEach(node => setDepth(node.id, 0));
  
  return depths;
};

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  // Calculate node dimensions first
  const nodeWidths = new Map<string, number>();
  const nodeHeights = new Map<string, number>();
  
  nodes.forEach((node) => {
    const data = node.data as ObjectNodeData;
    const contentHeight = 40 + (data.properties?.length || 0) * 24 + 20;
    const maxPropertyLength = data.properties?.reduce((max: number, prop: { key: string; value: any }) => {
      const keyLength = prop.key.length;
      const valueLength = String(prop.value).length;
      return Math.max(max, keyLength + valueLength);
    }, 0) || 0;
    
    const contentWidth = Math.max(200, Math.min(400, maxPropertyLength * 8 + 40));
    nodeWidths.set(node.id, contentWidth);
    nodeHeights.set(node.id, contentHeight);
  });

  // Calculate depths for each node
  const depths = calculateNodeDepths(nodes, edges);
  
  // Build parent-child relationships
  const parentMap = new Map<string, string>();
  edges.forEach(edge => {
    parentMap.set(edge.target, edge.source);
  });

  // Group nodes by depth
  const nodesByDepth = new Map<number, Node[]>();
  nodes.forEach(node => {
    const depth = depths.get(node.id) || 0;
    if (!nodesByDepth.has(depth)) {
      nodesByDepth.set(depth, []);
    }
    nodesByDepth.get(depth)?.push(node);
  });

  // Sort nodes within each depth based on their parent's position
  nodesByDepth.forEach((depthNodes, depth) => {
    if (depth > 0) {
      depthNodes.sort((a, b) => {
        const aParent = parentMap.get(a.id);
        const bParent = parentMap.get(b.id);
        
        if (aParent && bParent) {
          const aParentNode = nodes.find(n => n.id === aParent);
          const bParentNode = nodes.find(n => n.id === bParent);
          
          if (aParentNode && bParentNode) {
            return (aParentNode.position?.y || 0) - (bParentNode.position?.y || 0);
          }
        }
        return 0;
      });
    }
  });

  // Calculate maximum width for each column to ensure proper spacing
  const columnMaxWidths = new Map<number, number>();
  nodesByDepth.forEach((depthNodes, depth) => {
    const maxWidth = Math.max(...depthNodes.map(node => nodeWidths.get(node.id) || 0));
    columnMaxWidths.set(depth, maxWidth);
  });

  // Position nodes in a grid
  let totalHeight = 0;
  nodesByDepth.forEach((depthNodes) => {
    totalHeight = Math.max(totalHeight, 
      depthNodes.reduce((sum, node) => 
        sum + (nodeHeights.get(node.id) || 0) + VERTICAL_SPACING, 0
      )
    );
  });

  nodesByDepth.forEach((depthNodes, depth) => {
    // Calculate x position based on previous columns' widths
    let xPosition = COLUMN_PADDING;
    for (let i = 0; i < depth; i++) {
      const columnWidth = columnMaxWidths.get(i) || 0;
      xPosition += columnWidth + COLUMN_GAP;
    }

    // Position nodes vertically
    let currentY = TOP_PADDING;
    
    // If this is the root column (depth 0), center it vertically
    if (depth === 0 && depthNodes.length === 1) {
      const rootHeight = nodeHeights.get(depthNodes[0].id) || 0;
      currentY = (totalHeight - rootHeight) / 2;
    }

    // Track used vertical positions to prevent overlapping
    const usedPositions = new Set<number>();

    depthNodes.forEach((node) => {
      const height = nodeHeights.get(node.id) || 0;
      let targetY = currentY;
      
      // If node has a parent, try to align near parent's position
      const parentId = parentMap.get(node.id);
      if (parentId && depth > 0) {
        const parentNode = nodes.find(n => n.id === parentId);
        if (parentNode && parentNode.position) {
          // Start from parent's position
          targetY = parentNode.position.y;
          
          // Find next available position that doesn't overlap
          while (usedPositions.has(targetY)) {
            targetY += VERTICAL_SPACING;
          }
        }
      }

      // Ensure we don't overlap with any existing nodes
      while (usedPositions.has(targetY)) {
        targetY += VERTICAL_SPACING;
      }

      // Mark this position and the space needed for this node as used
      for (let y = targetY; y < targetY + height + VERTICAL_SPACING; y++) {
        usedPositions.add(y);
      }

      node.position = {
        x: xPosition,
        y: targetY
      };
      node.targetPosition = Position.Left;
      node.sourcePosition = Position.Right;
      node.style = {
        width: nodeWidths.get(node.id),
        height: height
      };
      
      currentY = targetY + height + VERTICAL_SPACING;
    });
  });

  // Update edges with orthogonal routing
  edges.forEach((edge) => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (sourceNode && targetNode) {
      edge.type = 'smoothstep';
      edge.animated = false;
      edge.style = {
        stroke: 'var(--edge-stroke)',
        strokeWidth: 2
      };
      edge.zIndex = 1000;
      edge.targetHandle = null;
    }
  });

  return { nodes, edges };
};

export interface GraphCanvasProps {
  onInit?: () => void;
}

export interface GraphCanvasHandle {
  updateJson: (json: any) => void;
}

export const GraphCanvas = forwardRef<GraphCanvasHandle, GraphCanvasProps>(({ onInit }, ref) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const updateJson = useCallback((json: any) => {
    const { nodes: newNodes, edges: newEdges } = jsonToGraph(json);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [setNodes, setEdges]);

  useImperativeHandle(ref, () => ({
    updateJson
  }));

  useEffect(() => {
    updateJson(sampleOrderData);
  }, [updateJson]);

  const defaultEdgeOptions: DefaultEdgeOptions = useMemo(() => ({
    type: 'smoothstep',
    animated: false,
    style: {
      stroke: 'var(--edge-stroke)',
      strokeWidth: 2
    },
    zIndex: 1000
  }), []);

  return (
    <GraphContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ 
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 4
        }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        nodesDraggable={false}
        nodesConnectable={true}
        elementsSelectable={true}
        minZoom={0.4}
        maxZoom={4}
        preventScrolling
      >
        <Background 
          color="var(--grid)"
          gap={12}
          size={0.5}
          className="opacity-30"
          variant={BackgroundVariant.Lines}
        />
        <Controls 
          className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm 
                     border border-[rgba(255,255,255,0.1)] rounded-lg"
          showInteractive={false}
        />
      </ReactFlow>
    </GraphContainer>
  );
});

GraphCanvas.displayName = 'GraphCanvas'; 