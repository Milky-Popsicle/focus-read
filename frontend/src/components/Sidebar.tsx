import { Link, useLocation } from 'react-router-dom'
import { Menu, X, BookOpen, Home, BarChart3, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

interface SidebarProps {
  items: { label: string; path: string; icon: React.ReactNode }[]
}

export const Sidebar = ({ items }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { logout, user } = useAuth()

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <BookOpen size={32} className="logo-icon" />
          <h1>FocusRead</h1>
        </div>

        <nav className="sidebar-nav">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="user-name">{user?.name}</p>
              <p className="user-role">{user?.role}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
