import { Users, CheckSquare, BarChart3, BookOpen } from 'lucide-react'
import { Card, StatCard, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import './Dashboard.css'

export const TeacherDashboard = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <Header 
          title="Teacher Dashboard" 
          subtitle="Monitor your students' reading progress"
        />

        <div className="stats-grid">
          <StatCard
            icon={<Users size={24} />}
            label="My Students"
            value={24}
            color="primary"
          />
          <StatCard
            icon={<CheckSquare size={24} />}
            label="Assessments Created"
            value={8}
            color="success"
          />
          <StatCard
            icon={<BarChart3 size={24} />}
            label="Avg. Progress"
            value="75%"
            color="info"
          />
          <StatCard
            icon={<BookOpen size={24} />}
            label="Reading Materials"
            value={12}
            color="warning"
          />
        </div>

        <div className="dashboard-grid">
          <Card className="dashboard-card">
            <div className="card-header">
              <h3>Recent Submissions</h3>
            </div>
            <div className="card-body">
              <div className="submission-item">
                <div className="submission-info">
                  <p className="submission-name">John Doe</p>
                  <p className="submission-details">Completed "The Great Adventure"</p>
                </div>
                <span className="submission-score">85%</span>
              </div>
              <div className="submission-item">
                <div className="submission-info">
                  <p className="submission-name">Jane Smith</p>
                  <p className="submission-details">Completed "Science Wonders"</p>
                </div>
                <span className="submission-score">92%</span>
              </div>
              <div className="submission-item">
                <div className="submission-info">
                  <p className="submission-name">Bob Johnson</p>
                  <p className="submission-details">Started "History Tales"</p>
                </div>
                <span className="submission-score">In Progress</span>
              </div>
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body">
              <ul className="action-list">
                <li>
                  <a href="/assessments">
                    <CheckSquare size={18} />
                    <span>Create Assessment</span>
                  </a>
                </li>
                <li>
                  <a href="/materials">
                    <BookOpen size={18} />
                    <span>Upload Material</span>
                  </a>
                </li>
                <li>
                  <a href="/students">
                    <Users size={18} />
                    <span>View All Students</span>
                  </a>
                </li>
                <li>
                  <a href="/reports">
                    <BarChart3 size={18} />
                    <span>Generate Report</span>
                  </a>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
