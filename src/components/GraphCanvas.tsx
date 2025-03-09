import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Panel,
  Position,
  MarkerType,
  DefaultEdgeOptions
} from 'reactflow';
import dagre from '@dagrejs/dagre';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import { ObjectNode } from './nodes';
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

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 320, height: 120 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
    node.position = {
      x: nodeWithPosition.x - 160,
      y: nodeWithPosition.y - 60
    };
  });

  return { nodes, edges };
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
    updateJson(initialJson);
  }, [updateJson]);

  const defaultEdgeOptions: DefaultEdgeOptions = useMemo(() => ({
    type: 'smoothstep',
    style: {
      stroke: 'var(--node-border)',
      strokeWidth: 2
    },
    markerEnd: {
      type: MarkerType.Arrow,
      color: 'var(--node-border)'
    }
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
        fitViewOptions={{ padding: 0.2 }}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        minZoom={0.1}
        maxZoom={1.5}
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
        />
        <Panel position="top-right" className="bg-white/10 backdrop-blur rounded p-2">
          <button
            onClick={() => updateJson(initialJson)}
            className="text-sm text-white/60 hover:text-white"
          >
            Reset View
          </button>
        </Panel>
      </ReactFlow>
    </GraphContainer>
  );
});

GraphCanvas.displayName = 'GraphCanvas'; 