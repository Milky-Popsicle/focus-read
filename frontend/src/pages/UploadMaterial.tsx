import { useState } from 'react'
import { Card, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Upload } from 'lucide-react'
import './Forms.css'
import { materialAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

export const UploadMaterial = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await materialAPI.create({
        title: formData.title,
        content: formData.content,
        createdBy: user?.id || 'unknown',
      })
      setSuccess('Material uploaded successfully!')
      setFormData({ title: '', content: '' })
      console.log('Created material:', response.data)
    } catch (err: any) {
      console.error('Error uploading material:', err)
      setError(err.response?.data?.message || 'Failed to upload material')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="form-container">
        <Header title="Upload Reading Material" subtitle="Add new reading content for your students" />

        <Card className="form-card">
          <div className="card-header">
            <h3>New Reading Material</h3>
          </div>
          <div className="card-body">
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="title">Material Title *</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., The Great Adventure"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Reading Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Paste or write the reading material here..."
                  rows={10}
                  required
                />
              </div>

              <div className="form-info">
                <p>💡 <strong>Tip:</strong> You can paste text directly or paste content from a document. Make sure the content is clear and suitable for your students' grade level.</p>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Material'}
              </button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
