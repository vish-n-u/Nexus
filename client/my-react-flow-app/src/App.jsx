import { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';

import Sidebar from './components/Sidebar';
import FlowConsole from './components/FlowConsole';
import TextNode from './nodes/TextNode';
import UploadImageNode from './nodes/UploadImageNode';
import UploadVideoNode from './nodes/UploadVideoNode';
import RunLLMNode from './nodes/RunLLMNode';
import CropImageNode from './nodes/CropImageNode';
import ExtractFrameNode from './nodes/ExtractFrameNode';

const nodeTypes = {
  textNode:        TextNode,
  uploadImageNode: UploadImageNode,
  uploadVideoNode: UploadVideoNode,
  runLLMNode:      RunLLMNode,
  cropImageNode:   CropImageNode,
  extractFrameNode: ExtractFrameNode,
};

const NODE_COLORS = {
  textNode:        '#22c55e',
  uploadImageNode: '#3b82f6',
  uploadVideoNode: '#6366f1',
  runLLMNode:      '#a855f7',
  cropImageNode:   '#f59e0b',
  extractFrameNode:'#f97316',
};

let uid = 1;
const nextId = () => `node_${uid++}`;

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const wrapperRef = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)), [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)), [],
  );
  const onConnect = useCallback(
    (params) => setEdges((es) => addEdge({ ...params, animated: true }, es)), [],
  );

  useEffect(() => {
    console.log('nodes:', nodes);
    console.log('edges:', edges);
  }, [nodes, edges]);

  /* Click: add node to viewport center */
  const addNode = useCallback((type) => {
    if (!rfInstance || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const position = rfInstance.screenToFlowPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setNodes((ns) => [
      ...ns,
      { id: nextId(), type, position: { x: position.x - 130, y: position.y - 80 }, data: {} },
    ]);
  }, [rfInstance]);

  /* Drag-over */
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  /* Drop onto canvas */
  const onDrop = useCallback((e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/reactflow');
    if (!type || !rfInstance) return;
    const position = rfInstance.screenToFlowPosition({ x: e.clientX, y: e.clientY });
    setNodes((ns) => [...ns, { id: nextId(), type, position, data: {} }]);
  }, [rfInstance]);

  return (
    <div className="app-container">
      <Sidebar onAddNode={addNode} />

      <div className="flow-wrapper" ref={wrapperRef} style={{ position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setRfInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{
            type: 'smoothstep',
            style: { stroke: '#7c3aed', strokeWidth: 2 },
          }}
          deleteKeyCode={['Delete', 'Backspace']}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} color="#1e1e35" gap={24} size={1.2} />
          <Controls />
          <MiniMap
            nodeColor={(n) => NODE_COLORS[n.type] ?? '#6b7280'}
            maskColor="rgba(8,8,16,0.75)"
            style={{ background: '#0f0f1a', border: '1px solid #1e1e35' }}
          />
        </ReactFlow>
        <FlowConsole nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}
