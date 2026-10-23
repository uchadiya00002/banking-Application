export type Page = "dashboard" | "transactions" | "transfers" | "profile";

type SidebarProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "dashboard", label: "Overview", icon: "⌂" },
  { id: "transactions", label: "Transactions", icon: "↔" },
  { id: "transfers", label: "Transfers", icon: "⇧" },
  { id: "profile", label: "Profile", icon: "○" },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">M</div>
        <span>MicroBank</span>
      </div>

      <p className="nav-heading">BANKING</p>

      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot" />
        Demo environment
      </div>
    </aside>
  );
}
