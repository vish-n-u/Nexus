import { Handle, Position } from '@xyflow/react';

const NODE_CONFIG = {
  trigger: {
    color: '#f97316',
    icon: '⚡',
    label: 'Trigger',
  },
  model: {
    color: '#a855f7',
    icon: '◈',
    label: 'AI Model',
  },
  imageInput: {
    color: '#3b82f6',
    icon: '⬡',
    label: 'Image',
  },
  textInput: {
    color: '#06b6d4',
    icon: 'T',
    label: 'Text',
  },
  output: {
    color: '#22c55e',
    icon: '→',
    label: 'Output',
  },
  transform: {
    color: '#eab308',
    icon: '⟳',
    label: 'Transform',
  },
};

export default function BaseNode({ data, type, selected }) {
  const config = NODE_CONFIG[type] || { color: '#6b7280', icon: '?', label: type };
  const { label, inputs = [], outputs = [] } = data;
  const color = config.color;

  return (
    <div
      className={`krea-node${selected ? ' selected' : ''}`}
      style={{ '--node-color': color }}
    >
      {/* Colored left accent bar */}
      <div className="node-accent" />

      {/* Header */}
      <div className="node-header">
        <div
          className="node-icon"
          style={{
            color,
            borderColor: `${color}44`,
            background: `${color}18`,
          }}
        >
          {config.icon}
        </div>
        <span className="node-label">{label}</span>
        <span
          className="node-type-pill"
          style={{ background: `${color}22`, color }}
        >
          {config.label}
        </span>
      </div>

      {/* Body: inputs + outputs */}
      {(inputs.length > 0 || outputs.length > 0) && (
        <div className="node-body">
          <div className="node-inputs">
            {inputs.map((input) => (
              <div key={input} className="handle-row">
                <Handle
                  type="target"
                  position={Position.Left}
                  id={input}
                  style={{
                    background: color,
                    borderColor: color,
                    width: 8,
                    height: 8,
                    left: -4,
                  }}
                />
                <span className="handle-label">{input}</span>
              </div>
            ))}
          </div>
          <div className="node-outputs">
            {outputs.map((output) => (
              <div key={output} className="handle-row handle-row-right">
                <span className="handle-label">{output}</span>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={output}
                  style={{
                    background: color,
                    borderColor: color,
                    width: 8,
                    height: 8,
                    right: -4,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="node-footer">
        <span className="status-dot" style={{ background: color }} />
        <span className="status-text">Ready</span>
      </div>
    </div>
  );
}
