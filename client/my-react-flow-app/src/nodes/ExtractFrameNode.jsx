import { useState } from 'react';
import { Handle, Position, useHandleConnections, useReactFlow } from '@xyflow/react';
import NodeWrapper from './NodeWrapper';

const COLOR = '#f97316';

const FrameIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M7 2v20M17 2v20" />
    <path d="M2 7h5M17 7h5M2 17h5M17 17h5" />
  </svg>
);

export default function ExtractFrameNode({ id, selected, data }) {
  const { updateNodeData } = useReactFlow();
  const videoConn = useHandleConnections({ type: 'target', id: 'video_url' });
  const videoConnected = videoConn.length > 0;
  const timestampConn = useHandleConnections({ type: 'target', id: 'timestamp' });
  const timestampConnected = timestampConn.length > 0;
  const [timestamp, setTimestamp] = useState('');

  return (
    <NodeWrapper title="Extract Frame" icon={<FrameIcon />} color={COLOR} selected={selected} status={data?.status}>
      {/* video_url handle */}
      <div className="nf-handle-row nf-handle-row--input">
        <Handle
          type="target"
          position={Position.Left}
          id="video_url"
          style={{
            background: videoConnected ? COLOR : '#2a2a45',
            borderColor: COLOR,
          }}
        />
        <span className="nf-label">
          video_url
          {videoConnected
            ? <span className="nf-badge">connected</span>
            : <span className="nf-required"> *</span>}
        </span>
      </div>

      <div className="nf-divider" />

      {/* timestamp */}
      <div className="nf-input-group">
        <div className="nf-handle-row nf-handle-row--input">
          <Handle
            type="target"
            position={Position.Left}
            id="timestamp"
            style={{
              background: timestampConnected ? COLOR : '#2a2a45',
              borderColor: COLOR,
            }}
          />
          <span className="nf-label">
            timestamp
            {timestampConnected && <span className="nf-badge">connected</span>}
          </span>
        </div>
        <input
          type="text"
          className="nf-input nodrag"
          placeholder={timestampConnected ? 'Receiving from connection…' : 'e.g. 5 or 50%'}
          value={timestampConnected ? '' : timestamp}
          onChange={(e) => { setTimestamp(e.target.value); updateNodeData(id, { timestamp: e.target.value }); }}
          disabled={timestampConnected}
        />
      </div>

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
