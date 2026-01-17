import { useState } from 'react';

const menuItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/admin' },
  { icon: 'users', label: 'Users', path: '/admin/users' },
  { icon: 'chart-bar', label: 'Analytics', path: '/admin/analytics' },
  { icon: 'cog', label: 'Settings', path: '/admin/settings' },
  { icon: 'file-alt', label: 'Content', path: '/admin/content' },
];

export default function DashboardSidebar({ activePath }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-shield-alt"></i>
          {!collapsed && <span>AdminPanel</span>}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <i className={`fas fa-chevron-${collapsed ? 'right' : 'left'}`}></i>
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`nav-item ${activePath === item.path ? 'active' : ''}`}
          >
            <i className={`fas fa-${item.icon}`}></i>
            {!collapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <a href="/logout" className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          {!collapsed && <span>Logout</span>}
        </a>
      </div>
    </aside>
  );
}