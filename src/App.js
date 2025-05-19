import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

import './App.css';
import TextUpdaterNode from './TextUpdaterNode';

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

let id = 0;
const getId = () => `node_${id++}`;

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleNodeTextChange = (id, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...node.data, label: value, onChange: handleNodeTextChange },
            }
          : node
      )
    );
  };

  const addNode = () => {
    const newNode = {
      id: getId(),
      data: {
        label: `Step ${id}`,
        onChange: handleNodeTextChange,
      },
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
      type: 'textUpdater',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveFlow = () => {
    const flow = {
      nodes,
      edges,
    };
    localStorage.setItem('journey-flow', JSON.stringify(flow));
    alert('Journey saved!');
  };

  const loadFlow = () => {
    const flow = JSON.parse(localStorage.getItem('journey-flow'));
    if (flow) {
      setNodes(
        flow.nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            onChange: handleNodeTextChange,
          },
        }))
      );
      setEdges(flow.edges);
    } else {
      alert('No saved journey found.');
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {/* Header with buttons */}
      <div className="header">
        <div className="title">🛠 Journey Builder</div>
        <button onClick={addNode}>Add Node</button>
        <button onClick={saveFlow}>Save</button>
        <button onClick={loadFlow}>Load</button>
        <button onClick={() => { setNodes([]); setEdges([]); }}>Clear All</button>
      </div>
  
      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
  
}

export default App;
