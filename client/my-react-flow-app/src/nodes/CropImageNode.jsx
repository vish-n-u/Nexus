import { Handle, Position, useHandleConnections } from '@xyflow/react';
import { useState } from 'react';
import NodeWrapper from './NodeWrapper';

const COLOR = '#f59e0b';

const CropIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2v14a2 2 0 002 2h14" />
    <path d="M18 22V8a2 2 0 00-2-2H2" />
  </svg>
);

/* One number field row with its own handle connection check */
function NumberFieldRow({ handleId, label, defaultVal }) {
  const connections = useHandleConnections({ type: 'target', id: handleId });
  const connected = connections.length > 0;
  const [value, setValue] = useState(defaultVal);

  return (
    <div className="nf-field-row">
      <Handle
        type="target"
        position={Position.Left}
        id={handleId}
        style={{
          background: connected ? COLOR : '#2a2a45',
          borderColor: COLOR,
        }}
      />
      <span className="nf-label nf-label--sm">{label}</span>
      <input
        type="number"
        className="nf-input nf-input--sm nodrag"
        value={connected ? '' : value}
        onChange={(e) => setValue(e.target.value)}
        disabled={connected}
        placeholder={connected ? '—' : ''}
        min={0}
        max={100}
      />
    </div>
  );
}

export default function CropImageNode({ selected }) {
  const imageConn = useHandleConnections({ type: 'target', id: 'image_url' });
  const imageConnected = imageConn.length > 0;

  return (
    <NodeWrapper title="Crop Image" icon={<CropIcon />} color={COLOR} selected={selected}>
      {/* image_url handle */}
      <div className="nf-handle-row nf-handle-row--input">
        <Handle
          type="target"
          position={Position.Left}
          id="image_url"
          style={{
            background: imageConnected ? COLOR : '#2a2a45',
            borderColor: COLOR,
          }}
        />
        <span className="nf-label">
          image_url
          {imageConnected
            ? <span className="nf-badge">connected</span>
            : <span className="nf-required"> *</span>}
        </span>
      </div>

      <div className="nf-divider" />

      <NumberFieldRow handleId="x_percent"      label="x %"      defaultVal={0} />
      <NumberFieldRow handleId="y_percent"      label="y %"      defaultVal={0} />
      <NumberFieldRow handleId="width_percent"  label="width %"  defaultVal={100} />
      <NumberFieldRow handleId="height_percent" label="height %"  defaultVal={100} />

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
