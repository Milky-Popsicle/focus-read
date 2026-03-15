import { useState, useEffect } from 'react'
import { Card, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Users, Trash2, Edit, Plus } from 'lucide-react'
import './ManageUsers.css'
import { usersAPI } from '../services/api'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student'
}

export const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { id: '2', name: 'John Teacher', email: 'teacher@example.com', role: 'teacher' },
    { id: '3', name: 'Jane Student', email: 'student@example.com', role: 'student' },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await usersAPI.getAll()
      if (response.data.length > 0) {
        setUsers(response.data)
      }
    } catch (err: any) {
      console.error('Error loading users:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId))
    }
  }

  const filteredUsers = filterRole === 'all' ? users : users.filter(u => u.role === filterRole)

  const roleCounts = {
    admin: users.filter(u => u.role === 'admin').length,
    teacher: users.filter(u => u.role === 'teacher').length,
    student: users.filter(u => u.role === 'student').length,
  }

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'role-admin',
      teacher: 'role-teacher',
      student: 'role-student',
    }
    return colors[role] || 'role-default'
  }

  return (
    <DashboardLayout>
      <div className="manage-users-container">
        <Header
          title="Manage Users"
          subtitle="Control user accounts and permissions"
          action={<button className="btn btn-primary"><Plus size={18} /> New User</button>}
        />

        {error && <div className="error-message">{error}</div>}

        <div className="stats-row">
          <Card className="stat-card">
            <p className="stat-label">Total Users</p>
            <p className="stat-value">{users.length}</p>
          </Card>
          <Card className="stat-card">
            <p className="stat-label">Administrators</p>
            <p className="stat-value">{roleCounts.admin}</p>
          </Card>
          <Card className="stat-card">
            <p className="stat-label">Teachers</p>
            <p className="stat-value">{roleCounts.teacher}</p>
          </Card>
          <Card className="stat-card">
            <p className="stat-label">Students</p>
            <p className="stat-value">{roleCounts.student}</p>
          </Card>
        </div>

        <Card className="users-table-card">
          <div className="card-header">
            <h3>Users List</h3>
            <div className="filter-controls">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Roles</option>
                <option value="admin">Administrators</option>
                <option value="teacher">Teachers</option>
                <option value="student">Students</option>
              </select>
            </div>
          </div>

          <div className="card-body">
            {loading ? (
              <p className="text-secondary">Loading users...</p>
            ) : filteredUsers.length === 0 ? (
              <p className="text-secondary">No users found</p>
            ) : (
              <div className="users-table">
                <div className="table-header">
                  <div className="col-name">Name</div>
                  <div className="col-email">Email</div>
                  <div className="col-role">Role</div>
                  <div className="col-actions">Actions</div>
                </div>
                {filteredUsers.map(user => (
                  <div key={user.id} className="table-row">
                    <div className="col-name">
                      <div className="user-name-cell">
                        <div className="user-avatar">{user.name.charAt(0)}</div>
                        <span>{user.name}</span>
                      </div>
                    </div>
                    <div className="col-email">{user.email}</div>
                    <div className="col-role">
                      <span className={`role-badge ${getRoleBadgeColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                    <div className="col-actions">
                      <button className="action-btn edit" title="Edit user">
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
