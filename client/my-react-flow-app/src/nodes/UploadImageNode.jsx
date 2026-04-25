import { useState, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeWrapper from './NodeWrapper';

const COLOR = '#3b82f6';

const ImageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

export default function UploadImageNode({ selected }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <NodeWrapper title="Upload Image" icon={<ImageIcon />} color={COLOR} selected={selected}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />

      <div
        className={`nf-upload-area nodrag${preview ? ' nf-upload-area--filled' : ''}`}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="preview" className="nf-preview-img" />
        ) : (
          <div className="nf-upload-placeholder">
            <span className="nf-upload-icon" style={{ color: COLOR }}>
              <ImageIcon />
            </span>
            <span className="nf-upload-text">Click to upload</span>
            <span className="nf-upload-hint">PNG · JPG · WEBP</span>
          </div>
        )}
      </div>

      {preview && (
        <div className="nf-field" style={{ paddingTop: 0 }}>
          <button
            className="nf-btn nf-btn--ghost nodrag"
            style={{ borderColor: `${COLOR}44`, color: COLOR }}
            onClick={() => { setPreview(null); inputRef.current.value = ''; }}
          >
            Remove
          </button>
        </div>
      )}

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
