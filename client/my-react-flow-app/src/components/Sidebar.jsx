const NODES = [
  {
    type: 'textNode',
    label: 'Text',
    desc: 'Plain text input',
    color: '#22c55e',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" />
      </svg>
    ),
  },
  {
    type: 'uploadImageNode',
    label: 'Upload Image',
    desc: 'Image data source',
    color: '#3b82f6',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    type: 'uploadVideoNode',
    label: 'Upload Video',
    desc: 'Video data source',
    color: '#6366f1',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    type: 'runLLMNode',
    label: 'Run LLM',
    desc: 'AI model inference',
    color: '#a855f7',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    ),
  },
  {
    type: 'cropImageNode',
    label: 'Crop Image',
    desc: 'Crop a region',
    color: '#f59e0b',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2v14a2 2 0 002 2h14" />
        <path d="M18 22V8a2 2 0 00-2-2H2" />
      </svg>
    ),
  },
  {
    type: 'extractFrameNode',
    label: 'Extract Frame',
    desc: 'Frame from video',
    color: '#f97316',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M7 2v20M17 2v20" />
        <path d="M2 7h5M17 7h5M2 17h5M17 17h5" />
      </svg>
    ),
  },
];

export default function Sidebar({ onAddNode }) {
  const onDragStart = (e, type) => {
    e.dataTransfer.setData('application/reactflow', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="nf-sidebar">
      <div className="nf-sidebar-header">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <span className="nf-sidebar-title">NextFlow</span>
      </div>

      <p className="nf-sidebar-section">Quick Access</p>

      <div className="nf-sidebar-list">
        {NODES.map(({ type, label, desc, color, icon }) => (
          <div
            key={type}
            className="nf-sidebar-item"
            style={{ '--icolor': color }}
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            onClick={() => onAddNode(type)}
          >
            <div
              className="nf-sidebar-icon"
              style={{ color, background: `${color}1a`, borderColor: `${color}44` }}
            >
              {icon}
            </div>
            <div className="nf-sidebar-info">
              <span className="nf-sidebar-label">{label}</span>
              <span className="nf-sidebar-desc">{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
