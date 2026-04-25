import { useState } from 'react';

const NODE_COLORS = {
  textNode:         '#22c55e',
  uploadImageNode:  '#3b82f6',
  uploadVideoNode:  '#6366f1',
  runLLMNode:       '#a855f7',
  cropImageNode:    '#f59e0b',
  extractFrameNode: '#f97316',
};

export default function FlowConsole({ nodes, edges }) {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState('nodes');

  return (
    <div className={`fc-console${open ? ' fc-console--open' : ''}`}>
      {/* Title bar */}
      <div className="fc-bar" onClick={() => setOpen((o) => !o)}>
        <div className="fc-bar-left">
          <span className="fc-bar-icon">{'>'}_</span>
          <span className="fc-bar-title">Flow Console</span>
          <span className="fc-count">{nodes.length} nodes</span>
          <span className="fc-count">{edges.length} edges</span>
        </div>
        <span className="fc-toggle">{open ? '▾' : '▴'}</span>
      </div>

      {open && (
        <div className="fc-body">
          {/* Tabs */}
          <div className="fc-tabs">
            <button
              className={`fc-tab${tab === 'nodes' ? ' fc-tab--active' : ''}`}
              onClick={() => setTab('nodes')}
            >
              Nodes ({nodes.length})
            </button>
            <button
              className={`fc-tab${tab === 'edges' ? ' fc-tab--active' : ''}`}
              onClick={() => setTab('edges')}
            >
              Edges ({edges.length})
            </button>
          </div>

          {/* Content */}
          <div className="fc-content">
            {tab === 'nodes' && (
              nodes.length === 0
                ? <p className="fc-empty">No nodes on canvas.</p>
                : nodes.map((node) => {
                    const color = NODE_COLORS[node.type] ?? '#6b7280';
                    return (
                      <div key={node.id} className="fc-row">
                        <span className="fc-dot" style={{ background: color }} />
                        <span className="fc-id">{node.id}</span>
                        <span className="fc-type" style={{ color }}>{node.type}</span>
                        <span className="fc-pos">
                          x: {Math.round(node.position.x)}&nbsp;&nbsp;
                          y: {Math.round(node.position.y)}
                        </span>
                      </div>
                    );
                  })
            )}

            {tab === 'edges' && (
              edges.length === 0
                ? <p className="fc-empty">No connections yet.</p>
                : edges.map((edge) => (
                    <div key={edge.id} className="fc-row">
                      <span className="fc-dot" style={{ background: '#7c3aed' }} />
                      <span className="fc-id">{edge.id}</span>
                      <span className="fc-edge-path">
                        <span className="fc-node-ref">{edge.source}</span>
                        {edge.sourceHandle && (
                          <span className="fc-handle-ref">:{edge.sourceHandle}</span>
                        )}
                        <span className="fc-arrow"> → </span>
                        <span className="fc-node-ref">{edge.target}</span>
                        {edge.targetHandle && (
                          <span className="fc-handle-ref">:{edge.targetHandle}</span>
                        )}
                      </span>
                    </div>
                  ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
