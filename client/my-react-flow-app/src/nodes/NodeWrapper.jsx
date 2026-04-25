export default function NodeWrapper({ title, icon, color, selected, status, width = 260, children }) {
  const statusClass = status && status !== 'idle' ? ` nf-node--${status}` : '';
  return (
    <div
      className={`nf-node${selected ? ' nf-node--selected' : ''}${statusClass}`}
      style={{ '--ncolor': color, width }}
    >
      <div className="nf-accent" />
      <div className="nf-header">
        <div
          className="nf-header-icon"
          style={{ color, background: `${color}1a`, borderColor: `${color}40` }}
        >
          {icon}
        </div>
        <span className="nf-header-title">{title}</span>
      </div>
      <div className="nf-body">{children}</div>
    </div>
  );
}
