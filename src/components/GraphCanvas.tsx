import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
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
  ReactFlowInstance
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import { ObjectNode, ObjectNodeData } from './nodes';
import ArrayNode from './nodes/ArrayNode';
import ValueNode from './nodes/ValueNode';
import { jsonToGraph } from '@/utils/jsonToGraph';

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

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Set the direction to LR (left to right)
  dagreGraph.setGraph({ 
    rankdir: 'LR', 
    nodesep: 50,     // Consistent vertical spacing
    ranksep: 120,    // Consistent horizontal spacing
    ranker: 'tight-tree',  // Use tight-tree for more consistent alignment
    align: 'UL',     // Align nodes to upper-left for consistency
    marginx: 20,     // Consistent horizontal margins
    marginy: 20      // Consistent vertical margins
  });

  // Group nodes by their depth level
  const nodesByLevel = new Map<number, Node[]>();
  const getNodeLevel = (nodeId: string, memo = new Map<string, number>()): number => {
    if (memo.has(nodeId)) return memo.get(nodeId)!;
    
    const parentEdges = edges.filter(e => e.target === nodeId);
    if (parentEdges.length === 0) {
      memo.set(nodeId, 0);
      return 0;
    }
    
    const parentLevel = getNodeLevel(parentEdges[0].source, memo);
    const level = parentLevel + 1;
    memo.set(nodeId, level);
    return level;
  };

  // Group nodes by their level
  nodes.forEach(node => {
    const level = getNodeLevel(node.id);
    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, []);
    }
    nodesByLevel.get(level)!.push(node);
  });

  // Calculate maximum width needed for each level
  const levelWidths = new Map<number, number>();
  const MIN_WIDTH = 250;
  const MAX_WIDTH = 400;  // Reduced from 600 to match actual display constraints
  const CHAR_WIDTH = 8;   // Approximate width per character
  const PADDING = 80;     // Padding for node edges and spacing

  nodesByLevel.forEach((levelNodes, level) => {
    const maxWidth = levelNodes.reduce((max, node) => {
      const data = node.data as ObjectNodeData;
      // Calculate width based on content, but respect maximum display width
      const maxCharsPerLine = Math.floor((MAX_WIDTH - PADDING) / CHAR_WIDTH);
      const longestProp = data.properties?.reduce((maxLen, prop) => {
        // Truncate the value length to match what will actually be displayed
        const truncatedValueLength = Math.min(String(prop.value).length, maxCharsPerLine);
        const keyLength = Math.min(prop.key.length, maxCharsPerLine);
        return Math.max(maxLen, keyLength + truncatedValueLength);
      }, 0) || 0;

      // Calculate width with constraints
      const width = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, longestProp * CHAR_WIDTH + PADDING));
      return Math.max(max, width);
    }, 0);
    levelWidths.set(level, maxWidth);
  });

  // Add nodes to the graph with level-consistent widths
  nodes.forEach((node) => {
    const level = getNodeLevel(node.id);
    const width = levelWidths.get(level)!;
    const data = node.data as ObjectNodeData;
    const height = Math.max(80, (data.properties?.length || 0) * 24 + 40);

    dagreGraph.setNode(node.id, { 
      width,
      height,
      level // Store level for later use
    });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target, {
      minlen: 1,
      weight: 1
    });
  });

  // Calculate the layout
  dagre.layout(dagreGraph);

  // Get the positioned nodes and ensure consistent positioning within levels
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const level = getNodeLevel(node.id);
    const width = levelWidths.get(level)!;
    const data = node.data as ObjectNodeData;
    const height = Math.max(80, (data.properties?.length || 0) * 24 + 40);

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - height / 2
      },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      style: {
        width,
        height
      }
    };
  });

  return { nodes: layoutedNodes, edges };
};

export interface GraphCanvasProps {
  onInit?: () => void;
}

export interface GraphCanvasHandle {
  updateJson: (json: any) => void;
}

const initialJson = {
  orderId: "ORD-2024-1234",
  orderDate: "2024-03-19T10:30:00Z",
  status: "processing",
  customer: {
    id: "CUST-789",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.j@example.com",
    phone: "+1-555-123-4567",
    address: {
      street: "123 Main Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      country: "USA"
    }
  },
  items: {
    products: [
      {
        id: "PROD-001",
        name: "Mechanical Keyboard",
        price: 149.99,
        quantity: 1,
        category: "Electronics"
      },
      {
        id: "PROD-002",
        name: "27-inch Monitor",
        price: 299.99,
        quantity: 2,
        category: "Electronics"
      }
    ],
    subtotal: 749.97,
    tax: 62.50,
    total: 812.47
  },
  shipping: {
    method: "Express",
    carrier: "FedEx",
    trackingNumber: "FX-987654321",
    estimatedDelivery: "2024-03-22",
    cost: 15.99
  },
  payment: {
    method: "Credit Card",
    status: "completed",
    transactionId: "TXN-456789",
    cardType: "Visa",
    lastFourDigits: "4567",
    billingAddress: {
      sameAsShipping: true
    }
  }
};

export const GraphCanvas = forwardRef<GraphCanvasHandle, GraphCanvasProps>(({ onInit }, ref) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const fitViewOptions = useMemo(() => ({
    padding: 0.2,
    minZoom: 0.5,
    maxZoom: 4,
    duration: 800
  }), []);

  const updateJson = useCallback((json: any) => {
    const { nodes: newNodes, edges: newEdges } = jsonToGraph(json);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    // After updating nodes and edges, fit view
    setTimeout(() => {
      if (reactFlowInstance.current) {
        reactFlowInstance.current.fitView(fitViewOptions);
      }
    }, 50);
  }, [setNodes, setEdges, fitViewOptions]);

  useImperativeHandle(ref, () => ({
    updateJson
  }));

  useEffect(() => {
    updateJson(initialJson);
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

  const handleInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    onInit?.();
  }, [onInit]);

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
        onInit={handleInit}
        fitView
        fitViewOptions={fitViewOptions}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        minZoom={0.4}
        maxZoom={4}
        preventScrolling
      >
        <Background 
          color="var(--grid)"
          gap={24}
          size={1}
          className="opacity-20"
        />
        <Controls 
          className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm 
                     border border-[rgba(255,255,255,0.1)] rounded-lg"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
      </ReactFlow>
    </GraphContainer>
  );
});

GraphCanvas.displayName = 'GraphCanvas'; 