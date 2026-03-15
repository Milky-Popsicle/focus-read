import { useState, useEffect } from 'react'
import { Card, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { BookOpen, Trash2, Edit, Plus, Calendar } from 'lucide-react'
import './ManageMaterials.css'
import { materialAPI } from '../services/api'

interface Material {
  id: string
  title: string
  content: string
  createdBy: string
  createdAt?: string
}

export const ManageMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      title: 'The Great Adventure',
      content: 'A thrilling tale of exploration and discovery...',
      createdBy: 'John Teacher',
      createdAt: '2024-03-01',
    },
    {
      id: '2',
      title: 'Science Wonders',
      content: 'Explore the fascinating world of modern science...',
      createdBy: 'Jane Teacher',
      createdAt: '2024-02-28',
    },
    {
      id: '3',
      title: 'History Tales',
      content: 'Journey through the pages of world history...',
      createdBy: 'Bob Teacher',
      createdAt: '2024-02-25',
    },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadMaterials()
  }, [])

  const loadMaterials = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await materialAPI.getAll()
      if (response.data.length > 0) {
        setMaterials(response.data)
      }
    } catch (err: any) {
      console.error('Error loading materials:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMaterial = (materialId: string) => {
    if (confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(m => m.id !== materialId))
    }
  }

  const filteredMaterials = materials.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="manage-materials-container">
        <Header
          title="Manage Reading Materials"
          subtitle="Manage all reading content in the system"
          action={<button className="btn btn-primary"><Plus size={18} /> New Material</button>}
        />

        {error && <div className="error-message">{error}</div>}

        <Card className="materials-card">
          <div className="card-header">
            <h3>Reading Materials</h3>
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="card-body">
            {loading ? (
              <p className="text-secondary">Loading materials...</p>
            ) : filteredMaterials.length === 0 ? (
              <p className="text-secondary">No materials found</p>
            ) : (
              <div className="materials-list">
                {filteredMaterials.map(material => (
                  <div key={material.id} className="material-item">
                    <div className="material-icon">
                      <BookOpen size={24} />
                    </div>
                    <div className="material-content">
                      <h4>{material.title}</h4>
                      <p className="material-preview">{material.content.substring(0, 100)}...</p>
                      <div className="material-meta">
                        <span className="meta-item">
                          <span className="label">Created by:</span> {material.createdBy}
                        </span>
                        {material.createdAt && (
                          <span className="meta-item">
                            <Calendar size={14} />
                            {material.createdAt}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="material-actions">
                      <button className="action-btn edit" title="Edit material">
                        <Edit size={18} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteMaterial(material.id)}
                        title="Delete material"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="material-stats-card">
          <div className="card-header">
            <h3>Materials Statistics</h3>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <div className="stat-item">
                <p className="stat-label">Total Materials</p>
                <p className="stat-value">{materials.length}</p>
              </div>
              <div className="stat-item">
                <p className="stat-label">Total Content Size</p>
                <p className="stat-value">{Math.round(materials.reduce((acc, m) => acc + m.content.length, 0) / 1024)} KB</p>
              </div>
              <div className="stat-item">
                <p className="stat-label">Unique Authors</p>
                <p className="stat-value">{new Set(materials.map(m => m.createdBy)).size}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
