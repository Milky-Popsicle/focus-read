import { useState } from 'react'
import { Card, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { CheckSquare } from 'lucide-react'
import './Forms.css'
import { assessmentsAPI, materialAPI } from '../services/api'

export const CreateAssessment = () => {
  const [formData, setFormData] = useState({
    materialId: '',
    question: '',
    correctAnswer: '',
  })
  const [materials, setMaterials] = useState<any[]>([
    { id: '1', title: 'The Great Adventure' },
    { id: '2', title: 'Science Wonders' },
    { id: '3', title: 'History Tales' },
  ])
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await assessmentsAPI.create({
        materialId: formData.materialId,
        question: formData.question,
        correctAnswer: formData.correctAnswer,
      })
      setSuccess('Assessment created successfully!')
      setFormData({ materialId: '', question: '', correctAnswer: '' })
      console.log('Created assessment:', response.data)
    } catch (err: any) {
      console.error('Error creating assessment:', err)
      setError(err.response?.data?.message || 'Failed to create assessment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="form-container">
        <Header title="Create Assessment" subtitle="Add a new reading comprehension assessment" />

        <Card className="form-card">
          <div className="card-header">
            <h3>New Assessment</h3>
          </div>
          <div className="card-body">
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="materialId">Select Reading Material *</label>
                <select
                  id="materialId"
                  name="materialId"
                  value={formData.materialId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a material...</option>
                  {materials.map(material => (
                    <option key={material.id} value={material.id}>
                      {material.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="question">Assessment Question *</label>
                <textarea
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="Write the comprehension question here..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="correctAnswer">Correct Answer *</label>
                <input
                  id="correctAnswer"
                  type="text"
                  name="correctAnswer"
                  value={formData.correctAnswer}
                  onChange={handleChange}
                  placeholder="Enter the correct answer"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create Assessment'}
              </button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
