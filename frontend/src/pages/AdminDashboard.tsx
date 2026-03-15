import { useState, useEffect } from 'react'
import { Users, Book, BarChart3, Settings } from 'lucide-react'
import { Card, StatCard, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { usersAPI } from '../services/api'
import './Dashboard.css'

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeachers: 0,
    totalStudents: 0,
    totalMaterials: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await usersAPI.getAll()
        const users = response.data
        setStats({
          totalUsers: users.length,
          totalTeachers: users.filter((u: any) => u.role === 'teacher').length,
          totalStudents: users.filter((u: any) => u.role === 'student').length,
          totalMaterials: 12,
        })
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <Header title="Admin Dashboard" subtitle="System overview and management" />

        <div className="stats-grid">
          <StatCard
            icon={<Users size={24} />}
            label="Total Users"
            value={stats.totalUsers}
            color="primary"
          />
          <StatCard
            icon={<Users size={24} />}
            label="Teachers"
            value={stats.totalTeachers}
            color="info"
          />
          <StatCard
            icon={<Users size={24} />}
            label="Students"
            value={stats.totalStudents}
            color="success"
          />
          <StatCard
            icon={<Book size={24} />}
            label="Reading Materials"
            value={stats.totalMaterials}
            color="warning"
          />
        </div>

        <div className="dashboard-grid">
          <Card className="dashboard-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body">
              <ul className="action-list">
                <li>
                  <a href="/users">
                    <Users size={18} />
                    <span>Manage Users</span>
                  </a>
                </li>
                <li>
                  <a href="/materials">
                    <Book size={18} />
                    <span>Manage Materials</span>
                  </a>
                </li>
                <li>
                  <a href="/reports">
                    <BarChart3 size={18} />
                    <span>View Reports</span>
                  </a>
                </li>
                <li>
                  <a href="/settings">
                    <Settings size={18} />
                    <span>System Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="card-body">
              {loading ? (
                <p className="text-secondary">Loading activity...</p>
              ) : (
                <p className="text-secondary">No recent activity</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
