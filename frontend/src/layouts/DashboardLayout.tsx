import { ReactNode } from 'react'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import { Home, Users, FileText, BarChart3, BookOpen, CheckSquare } from 'lucide-react'
import './DashboardLayout.css'

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth()

  let navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
  ]

  if (user?.role === 'admin') {
    navItems.push(
      { label: 'Users', path: '/users', icon: <Users size={20} /> },
      { label: 'Materials', path: '/materials', icon: <BookOpen size={20} /> },
      { label: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> }
    )
  } else if (user?.role === 'teacher') {
    navItems.push(
      { label: 'Students', path: '/students', icon: <Users size={20} /> },
      { label: 'Assessments', path: '/assessments', icon: <CheckSquare size={20} /> },
      { label: 'Materials', path: '/materials', icon: <BookOpen size={20} /> },
      { label: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> }
    )
  } else if (user?.role === 'student') {
    navItems.push(
      { label: 'My Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
      { label: 'Progress', path: '/progress', icon: <BarChart3 size={20} /> }
    )
  }

  return (
    <div className="dashboard-layout">
      <Sidebar items={navItems} />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  )
}
