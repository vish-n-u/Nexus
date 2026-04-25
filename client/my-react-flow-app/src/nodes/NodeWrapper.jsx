export default function NodeWrapper({ title, icon, color, selected, width = 260, children }) {
  return (
    <div
      className={`nf-node${selected ? ' nf-node--selected' : ''}`}
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
