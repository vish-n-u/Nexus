import { useState, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeWrapper from './NodeWrapper';

const COLOR = '#6366f1';

const VideoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
  </svg>
);

export default function UploadVideoNode({ selected }) {
  const [videoUrl, setVideoUrl] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setVideoUrl(URL.createObjectURL(file));
  };

  return (
    <NodeWrapper title="Upload Video" icon={<VideoIcon />} color={COLOR} selected={selected}>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />

      <div
        className={`nf-upload-area nodrag${videoUrl ? ' nf-upload-area--filled' : ''}`}
        onClick={() => !videoUrl && inputRef.current?.click()}
      >
        {videoUrl ? (
          <video src={videoUrl} controls className="nf-preview-video" />
        ) : (
          <div className="nf-upload-placeholder">
            <span className="nf-upload-icon" style={{ color: COLOR }}>
              <VideoIcon />
            </span>
            <span className="nf-upload-text">Click to upload</span>
            <span className="nf-upload-hint">MP4 · MOV · WebM</span>
          </div>
        )}
      </div>

      {videoUrl && (
        <div className="nf-field" style={{ paddingTop: 0 }}>
          <button
            className="nf-btn nf-btn--ghost nodrag"
            style={{ borderColor: `${COLOR}44`, color: COLOR }}
            onClick={() => { setVideoUrl(null); inputRef.current.value = ''; }}
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
