export default function AdminPlaceholder({ title, icon, description }) {
  return <section className="admin-section">
    <p className="eyebrow">Admin panel</p>
    <div className="admin-section-heading"><span className="admin-section-icon" aria-hidden="true">{icon}</span><div><h2>{title}</h2><p>{description}</p></div></div>
    <div className="admin-empty-state"><strong>{title} workspace</strong><span>This section is ready for its management tools.</span></div>
  </section>
}