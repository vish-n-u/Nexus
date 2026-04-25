import { useState } from 'react';
import { Handle, Position, useHandleConnections } from '@xyflow/react';
import NodeWrapper from './NodeWrapper';

const COLOR = '#a855f7';
const MODELS = ['Gemini 1.5 Flash', 'Gemini 1.5 Pro'];

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
  </svg>
);

/* Sub-component so useHandleConnections can be called per-handle */
function ConnectedTextarea({ handleId, label, required, placeholder, rows = 3 }) {
  const connections = useHandleConnections({ type: 'target', id: handleId });
  const connected = connections.length > 0;
  const [value, setValue] = useState('');

  return (
    <div className="nf-input-group">
      <div className="nf-handle-row nf-handle-row--input">
        <Handle
          type="target"
          position={Position.Left}
          id={handleId}
          style={{
            background: connected ? COLOR : '#2a2a45',
            borderColor: COLOR,
          }}
        />
        <span className="nf-label">
          {label}
          {required && <span className="nf-required"> *</span>}
          {connected && <span className="nf-badge">connected</span>}
        </span>
      </div>
      <textarea
        className="nf-textarea nf-textarea--sm nodrag"
        placeholder={connected ? 'Receiving from connection…' : placeholder}
        rows={rows}
        value={connected ? '' : value}
        onChange={(e) => setValue(e.target.value)}
        disabled={connected}
      />
    </div>
  );
}

export default function RunLLMNode({ selected }) {
  const [model, setModel] = useState(MODELS[0]);
  const imagesConn = useHandleConnections({ type: 'target', id: 'images' });

  return (
    <NodeWrapper title="Run LLM" icon={<SparkleIcon />} color={COLOR} selected={selected} width={300}>
      {/* Model dropdown */}
      <div className="nf-field">
        <label className="nf-label">Model</label>
        <select
          className="nf-select nodrag"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          {MODELS.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>

      {/* System Prompt – connected textarea */}
      <ConnectedTextarea
        handleId="system_prompt"
        label="System Prompt"
        placeholder="Optional system instructions…"
        rows={2}
      />

      {/* User Message – connected textarea */}
      <ConnectedTextarea
        handleId="user_message"
        label="User Message"
        required
        placeholder="Enter user message…"
        rows={3}
      />

      {/* Images handle (no field — handle only) */}
      <div className="nf-handle-row nf-handle-row--input" style={{ marginBottom: 2 }}>
        <Handle
          type="target"
          position={Position.Left}
          id="images"
          style={{
            background: imagesConn.length > 0 ? COLOR : '#2a2a45',
            borderColor: COLOR,
          }}
        />
        <span className="nf-label">
          images
          {imagesConn.length > 0 && (
            <span className="nf-badge">{imagesConn.length} connected</span>
          )}
        </span>
      </div>

      {/* Run button */}
      <div className="nf-field">
        <button
          className="nf-btn nf-btn--primary nodrag"
          style={{ background: COLOR }}
        >
          Run
        </button>
      </div>

      {/* Output display */}
      <div className="nf-field" style={{ paddingTop: 0 }}>
        <div className="nf-output-area">
          <span className="nf-output-placeholder">Output will appear here…</span>
        </div>
      </div>

      {/* Output handle */}
      <div className="nf-handle-row nf-handle-row--output">
        <span className="nf-handle-label">output</span>
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          style={{ background: COLOR, borderColor: COLOR }}
        />
      </div>
    </NodeWrapper>
  );
}
