"use client";
import React, { useCallback, useEffect } from "react";
import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/taskType";
import NodeComponent from "./nodes/NodeComponent";
import { AppNode } from "@/types/appNodeType";
import DeletableEdge from "./edges/DeletableEdge";
import { TaskRegistry } from "@/lib/workflow/task/registry";

const nodeTypes = {
  Node: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

type Props = {
  workflow: Workflow;
};

const FlowEditor = ({ workflow }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [workflow.definition, setEdges, setNodes]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData("application/reactflow");
      if (typeof taskType === undefined || !taskType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = CreateFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      console.log("ON CONNECT", connection);
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
      if (!connection.targetHandle) return;
      // remove input value if is present on connection
      const node = nodes.find((nd) => nd.id === connection.target);
      if (!node) return;

      const nodeInputs = { ...node.data.inputs };
      delete nodeInputs[connection.targetHandle];
      updateNodeData(node.id, {
        inputs: nodeInputs,
      });
    },
    [setEdges, updateNodeData, nodes]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // No self-connections allowed
      if (connection.source === connection.target) {
        return false;
      }
      // Same taskParam type connecton
      const source = nodes.find((node) => node.id === connection.source);
      const target = nodes.find((node) => node.id === connection.target);
      if (!source || !target) {
        console.log(`invalid connection: source or target node not found!`);
        return false;
      }

      const sourceTask = TaskRegistry[source.data.type];
      const targetTask = TaskRegistry[target.data.type];

      const output = sourceTask.outputs.find(
        (output) => output.name === connection.sourceHandle
      );

      const input = targetTask.inputs.find(
        (input) => input.name === connection.targetHandle
      );

      console.log(`@Debug`, { output, input });

      // cannot connect diffrent type
      if (input?.type !== output?.type) {
        console.error("invalid connection: type mismatch");
        return false;
      }

      // prevent cycle
      const hasCycle = (node: Node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);
        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      const detectedCycloe = hasCycle(target);
      return !detectedCycloe;
    },
    [nodes]
  );

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
