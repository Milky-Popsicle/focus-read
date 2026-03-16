import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, CheckCircle, Circle } from 'lucide-react'
import { studyPlansAPI } from '../services/api'
import { Card } from './Card'

interface StudyPlan {
  id: string
  studentId: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

interface ReadingStudyPlannerProps {
  studentId: string
}

export const ReadingStudyPlanner = ({ studentId }: ReadingStudyPlannerProps) => {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', description: '' })

  useEffect(() => {
    loadStudyPlans()
  }, [studentId])

  const loadStudyPlans = async () => {
    try {
      const response = await studyPlansAPI.getAllByStudent(studentId)
      setStudyPlans(response.data)
    } catch (error) {
      console.error('Failed to load study plans:', error)
    }
  }

  const handleCreate = async () => {
    if (!formData.title.trim()) return

    try {
      await studyPlansAPI.create(studentId, formData)
      setFormData({ title: '', description: '' })
      setIsCreating(false)
      loadStudyPlans()
    } catch (error) {
      console.error('Failed to create study plan:', error)
    }
  }

  const handleUpdate = async (id: string) => {
    if (!formData.title.trim()) return

    try {
      await studyPlansAPI.update(id, formData)
      setFormData({ title: '', description: '' })
      setEditingId(null)
      loadStudyPlans()
    } catch (error) {
      console.error('Failed to update study plan:', error)
    }
  }

  const handleMarkCompleted = async (id: string) => {
    try {
      await studyPlansAPI.markCompleted(id)
      loadStudyPlans()
    } catch (error) {
      console.error('Failed to mark as completed:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this study plan?')) return

    try {
      await studyPlansAPI.delete(id)
      loadStudyPlans()
    } catch (error) {
      console.error('Failed to delete study plan:', error)
    }
  }

  const startEditing = (plan: StudyPlan) => {
    setEditingId(plan.id)
    setFormData({ title: plan.title, description: plan.description })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setFormData({ title: '', description: '' })
  }

  return (
    <Card className="dashboard-card">
      <div className="card-header">
        <h3>Reading Study Planner</h3>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsCreating(true)}
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>
      <div className="card-body">
        {isCreating && (
          <div className="study-plan-form">
            <input
              type="text"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
            />
            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-textarea"
              rows={3}
            />
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleCreate}>
                Create
              </button>
              <button className="btn btn-secondary" onClick={() => {
                setIsCreating(false)
                setFormData({ title: '', description: '' })
              }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {studyPlans.length === 0 && !isCreating ? (
          <p className="no-tasks">No study tasks yet. Create your first task to get started!</p>
        ) : (
          <div className="study-plans-list">
            {studyPlans.map((plan) => (
              <div key={plan.id} className={`study-plan-item ${plan.completed ? 'completed' : ''}`}>
                {editingId === plan.id ? (
                  <div className="study-plan-form">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="form-input"
                    />
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="form-textarea"
                      rows={3}
                    />
                    <div className="form-actions">
                      <button className="btn btn-primary" onClick={() => handleUpdate(plan.id)}>
                        Update
                      </button>
                      <button className="btn btn-secondary" onClick={cancelEditing}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="study-plan-content">
                      <button
                        className="complete-btn"
                        onClick={() => handleMarkCompleted(plan.id)}
                        title={plan.completed ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        {plan.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                      </button>
                      <div className="study-plan-text">
                        <h4 className={plan.completed ? 'completed-text' : ''}>{plan.title}</h4>
                        {plan.description && <p>{plan.description}</p>}
                        <small>Created: {new Date(plan.createdAt).toLocaleDateString()}</small>
                      </div>
                    </div>
                    <div className="study-plan-actions">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => startEditing(plan)}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}