import { useState, useEffect } from 'react'
import { Card, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Users, Mail, TrendingUp } from 'lucide-react'
import './StudentsList.css'
import { studentsAPI } from '../services/api'

interface Student {
  id: string
  userId: string
  gradeLevel: string
  name?: string
  email?: string
}

export const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      userId: '10',
      gradeLevel: '10',
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      id: '2',
      userId: '11',
      gradeLevel: '9',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    {
      id: '3',
      userId: '12',
      gradeLevel: '10',
      name: 'Bob Johnson',
      email: 'bob@example.com',
    },
    {
      id: '4',
      userId: '13',
      gradeLevel: '9',
      name: 'Alice Williams',
      email: 'alice@example.com',
    },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await studentsAPI.getAll()
      setStudents(response.data.length > 0 ? response.data : students)
    } catch (err: any) {
      console.error('Error loading students:', err)
      // Keep the sample data if API fails
    } finally {
      setLoading(false)
    }
  }

  const getPerformanceStatus = (id: string): { status: string; color: string } => {
    const performanceMap: Record<string, { status: string; color: string }> = {
      '1': { status: 'Good', color: 'status-good' },
      '2': { status: 'Excellent', color: 'status-excellent' },
      '3': { status: 'Fair', color: 'status-fair' },
      '4': { status: 'Good', color: 'status-good' },
    }
    return performanceMap[id] || { status: 'Pending', color: 'status-pending' }
  }

  return (
    <DashboardLayout>
      <div className="students-list-container">
        <Header
          title="My Students"
          subtitle={`Managing ${students.length} students`}
        />

        {error && <div className="error-message">{error}</div>}

        <div className="students-grid">
          {loading ? (
            <Card className="loading-card">Loading students...</Card>
          ) : students.length === 0 ? (
            <Card className="empty-card">No students assigned yet</Card>
          ) : (
            students.map(student => {
              const performance = getPerformanceStatus(student.id)
              return (
                <Card
                  key={student.id}
                  className="student-card"
                  onClick={() => setSelectedStudent(selectedStudent?.id === student.id ? null : student)}
                >
                  <div className="student-header">
                    <div className="student-avatar">
                      {student.name?.charAt(0).toUpperCase() || 'S'}
                    </div>
                    <div className="student-info">
                      <h3>{student.name || `Student ${student.id}`}</h3>
                      <p className="student-grade">Grade {student.gradeLevel}</p>
                    </div>
                    <div className={`performance-badge ${performance.color}`}>
                      {performance.status}
                    </div>
                  </div>

                  {selectedStudent?.id === student.id && (
                    <div className="student-details">
                      <div className="detail-item">
                        <Mail size={16} />
                        <span>{student.email || 'No email'}</span>
                      </div>
                      <div className="detail-item">
                        <Users size={16} />
                        <span>ID: {student.userId}</span>
                      </div>
                      <div className="detail-item">
                        <TrendingUp size={16} />
                        <span>Progress: 75%</span>
                      </div>

                      <div className="action-buttons">
                        <button className="btn btn-primary">View Performance</button>
                        <button className="btn btn-outline">Send Message</button>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })
          )}
        </div>

        <Card className="summary-card">
          <div className="card-header">
            <h3>Class Summary</h3>
          </div>
          <div className="card-body">
            <div className="summary-stats">
              <div className="summary-item">
                <p className="summary-label">Total Students</p>
                <p className="summary-value">{students.length}</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Excellent</p>
                <p className="summary-value" style={{ color: '#10b981' }}>1</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Good</p>
                <p className="summary-value" style={{ color: '#3b82f6' }}>2</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Fair</p>
                <p className="summary-value" style={{ color: '#f59e0b' }}>1</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
