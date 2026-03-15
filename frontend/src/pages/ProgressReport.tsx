import { BarChart3, TrendingUp, Award, Calendar } from 'lucide-react'
import { Card, StatCard, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import './ProgressReport.css'

export const ProgressReport = () => {
  const reportData = [
    { assessment: 'The Great Adventure', score: 85, date: '2024-03-01', category: 'Fiction' },
    { assessment: 'Science Wonders', score: 92, date: '2024-02-28', category: 'Science' },
    { assessment: 'History Tales', score: 78, date: '2024-02-25', category: 'History' },
    { assessment: 'Mathematics Basics', score: 88, date: '2024-02-20', category: 'Math' },
    { assessment: 'Literature Review', score: 95, date: '2024-02-15', category: 'Literature' },
  ]

  const categoryStats = [
    { category: 'Fiction', average: 88, completed: 4 },
    { category: 'Science', average: 90, completed: 3 },
    { category: 'History', average: 82, completed: 3 },
    { category: 'Math', average: 86, completed: 2 },
  ]

  return (
    <DashboardLayout>
      <div className="progress-report-container">
        <Header 
          title="Progress Report" 
          subtitle="Detailed analysis of your reading assessment performance"
        />

        <div className="stats-grid">
          <StatCard
            icon={<Award size={24} />}
            label="Overall Score"
            value="87%"
            color="primary"
          />
          <StatCard
            icon={<TrendingUp size={24} />}
            label="Improvement"
            value="+12%"
            color="success"
          />
          <StatCard
            icon={<BarChart3 size={24} />}
            label="Assessments"
            value={reportData.length}
            color="info"
          />
          <StatCard
            icon={<Calendar size={24} />}
            label="Last 30 Days"
            value={reportData.length}
            color="warning"
          />
        </div>

        <div className="report-grid">
          <Card className="report-card">
            <div className="card-header">
              <h3>Assessment History</h3>
            </div>
            <div className="card-body">
              <div className="assessment-list">
                {reportData.map((item, idx) => (
                  <div key={idx} className="assessment-row">
                    <div className="assessment-details">
                      <p className="assessment-title">{item.assessment}</p>
                      <p className="assessment-category">{item.category} • {item.date}</p>
                    </div>
                    <div className="assessment-score-display">
                      <div className={`score-badge score-${item.score >= 90 ? 'excellent' : item.score >= 80 ? 'good' : 'fair'}`}>
                        {item.score}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="report-card">
            <div className="card-header">
              <h3>Performance by Category</h3>
            </div>
            <div className="card-body">
              <div className="category-stats">
                {categoryStats.map((stat, idx) => (
                  <div key={idx} className="category-item">
                    <div className="category-info">
                      <p className="category-name">{stat.category}</p>
                      <p className="category-meta">{stat.completed} assessments</p>
                    </div>
                    <div className="category-bar">
                      <div className="category-progress">
                        <div className="category-fill" style={{ width: `${stat.average}%` }}></div>
                      </div>
                      <span className="category-score">{stat.average}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card className="insights-card">
          <div className="card-header">
            <h3>Insights & Recommendations</h3>
          </div>
          <div className="card-body">
            <div className="insights-grid">
              <div className="insight-item">
                <h4>Strong Areas</h4>
                <ul>
                  <li>Literature comprehension</li>
                  <li>Scientific concepts</li>
                  <li>Reading speed</li>
                </ul>
              </div>
              <div className="insight-item">
                <h4>Areas for Improvement</h4>
                <ul>
                  <li>Historical context understanding</li>
                  <li>Detailed fact retention</li>
                  <li>Complex narrative analysis</li>
                </ul>
              </div>
              <div className="insight-item">
                <h4>Recommendations</h4>
                <ul>
                  <li>Review history materials with timeline focus</li>
                  <li>Practice detailed note-taking</li>
                  <li>Engage in group discussions</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
