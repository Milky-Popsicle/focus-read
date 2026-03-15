import { BookOpen, CheckCircle, Clock, BarChart3 } from 'lucide-react'
import { Card, StatCard, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import './Dashboard.css'

export const StudentDashboard = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <Header 
          title="My Dashboard" 
          subtitle="Track your reading progress and assessments"
        />

        <div className="stats-grid">
          <StatCard
            icon={<BookOpen size={24} />}
            label="Assigned Tasks"
            value={6}
            color="primary"
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            label="Completed"
            value={4}
            color="success"
          />
          <StatCard
            icon={<Clock size={24} />}
            label="In Progress"
            value={2}
            color="warning"
          />
          <StatCard
            icon={<BarChart3 size={24} />}
            label="Average Score"
            value="88%"
            color="info"
          />
        </div>

        <div className="dashboard-grid">
          <Card className="dashboard-card">
            <div className="card-header">
              <h3>My Assigned Tasks</h3>
            </div>
            <div className="card-body">
              <div className="task-item">
                <div className="task-info">
                  <p className="task-title">The Great Adventure</p>
                  <p className="task-details">Fiction • 1500 words</p>
                </div>
                <span className="task-status completed">Completed</span>
              </div>
              <div className="task-item">
                <div className="task-info">
                  <p className="task-title">Science Wonders</p>
                  <p className="task-details">Science • 2000 words</p>
                </div>
                <span className="task-status in-progress">In Progress</span>
              </div>
              <div className="task-item">
                <div className="task-info">
                  <p className="task-title">History Tales</p>
                  <p className="task-details">History • 1800 words</p>
                </div>
                <span className="task-status pending">Not Started</span>
              </div>
              <div className="task-item">
                <div className="task-info">
                  <p className="task-title">Mathematics Basics</p>
                  <p className="task-details">Mathematics • 1200 words</p>
                </div>
                <span className="task-status completed">Completed</span>
              </div>
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="card-header">
              <h3>Your Progress</h3>
            </div>
            <div className="card-body">
              <div className="progress-section">
                <div className="progress-label">
                  <span>Reading Comprehension</span>
                  <strong>88%</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div className="progress-section">
                <div className="progress-label">
                  <span>Assignment Completion</span>
                  <strong>67%</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div className="progress-section">
                <div className="progress-label">
                  <span>Overall Performance</span>
                  <strong>85%</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
