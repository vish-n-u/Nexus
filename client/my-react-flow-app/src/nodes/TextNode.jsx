import { Handle, Position, useReactFlow } from '@xyflow/react';
import NodeWrapper from './NodeWrapper';

const COLOR = '#22c55e';

const TextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" />
  </svg>
);

export default function TextNode({ id, selected, data }) {
  const { updateNodeData } = useReactFlow();

  return (
    <NodeWrapper title="Text" icon={<TextIcon />} color={COLOR} selected={selected} status={data?.status}>
      <div className="nf-field">
        <textarea
          className="nf-textarea nodrag"
          placeholder="Enter text here…"
          rows={4}
          value={data.text ?? ''}
          onChange={(e) => updateNodeData(id, { text: e.target.value })}
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
