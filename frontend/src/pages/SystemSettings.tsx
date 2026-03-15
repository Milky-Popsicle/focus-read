import { useState } from 'react'
import { Card, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Settings, Bell, Lock, Database, Save } from 'lucide-react'
import './SystemSettings.css'

interface SystemSettings {
  siteName: string
  siteDescription: string
  maxUploadSize: number
  emailNotifications: boolean
  autoBackup: boolean
  maintenanceMode: boolean
  sessionTimeout: number
}

export const SystemSettings = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'FocusRead',
    siteDescription: 'Online Reading Assessment and Monitoring System',
    maxUploadSize: 50,
    emailNotifications: true,
    autoBackup: true,
    maintenanceMode: false,
    sessionTimeout: 60,
  })

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const actualValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setSettings(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(actualValue) : actualValue,
    }))
    setSaved(false)
  }

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSaved(true)
      setLoading(false)
      setTimeout(() => setSaved(false), 3000)
    }, 500)
  }

  return (
    <DashboardLayout>
      <div className="system-settings-container">
        <Header title="System Settings" subtitle="Configure FocusRead application settings" />

        {saved && <div className="success-message">Settings saved successfully!</div>}

        <div className="settings-grid">
          {/* General Settings */}
          <Card className="settings-card">
            <div className="card-header">
              <h3>General Settings</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="siteName">Site Name</label>
                <input
                  id="siteName"
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="siteDescription">Site Description</label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxUploadSize">Max Upload Size (MB)</label>
                <input
                  id="maxUploadSize"
                  type="number"
                  name="maxUploadSize"
                  value={settings.maxUploadSize}
                  onChange={handleChange}
                  min="1"
                  max="500"
                />
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="settings-card">
            <div className="card-header">
              <h3>
                <Lock size={20} /> Security Settings
              </h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="sessionTimeout">Session Timeout (minutes)</label>
                <input
                  id="sessionTimeout"
                  type="number"
                  name="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                  min="5"
                  max="480"
                />
              </div>

              <div className="toggle-group">
                <label htmlFor="maintenanceMode">
                  <input
                    id="maintenanceMode"
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                  />
                  <span>Enable Maintenance Mode</span>
                </label>
                <p className="help-text">Restricts access to admin users only</p>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="settings-card">
            <div className="card-header">
              <h3>
                <Bell size={20} /> Notifications
              </h3>
            </div>
            <div className="card-body">
              <div className="toggle-group">
                <label htmlFor="emailNotifications">
                  <input
                    id="emailNotifications"
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                  />
                  <span>Email Notifications</span>
                </label>
                <p className="help-text">Send email alerts for important events</p>
              </div>
            </div>
          </Card>

          {/* Backup Settings */}
          <Card className="settings-card">
            <div className="card-header">
              <h3>
                <Database size={20} /> Data Management
              </h3>
            </div>
            <div className="card-body">
              <div className="toggle-group">
                <label htmlFor="autoBackup">
                  <input
                    id="autoBackup"
                    type="checkbox"
                    name="autoBackup"
                    checked={settings.autoBackup}
                    onChange={handleChange}
                  />
                  <span>Automatic Daily Backup</span>
                </label>
                <p className="help-text">Automatically backup system data daily at midnight</p>
              </div>

              <button className="btn btn-outline mt-4">Backup Now</button>
            </div>
          </Card>
        </div>

        <div className="settings-actions">
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
          <button className="btn btn-outline">Reset to Defaults</button>
        </div>

        {/* System Info */}
        <Card className="system-info-card">
          <div className="card-header">
            <h3>System Information</h3>
          </div>
          <div className="card-body">
            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">Application Version</p>
                <p className="info-value">1.0.0</p>
              </div>
              <div className="info-item">
                <p className="info-label">Database Status</p>
                <p className="info-value" style={{ color: '#10b981' }}>Connected</p>
              </div>
              <div className="info-item">
                <p className="info-label">Server Status</p>
                <p className="info-value" style={{ color: '#10b981' }}>Active</p>
              </div>
              <div className="info-item">
                <p className="info-label">Last Updated</p>
                <p className="info-value">2024-03-10</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
