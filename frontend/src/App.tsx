import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

// Auth pages
import { Login } from './pages/Login'
import { Register } from './pages/Register'

// Dashboards
import { AdminDashboard } from './pages/AdminDashboard'
import { TeacherDashboard } from './pages/TeacherDashboard'
import { StudentDashboard } from './pages/StudentDashboard'

// Feature pages
import { ReadingActivity } from './pages/ReadingActivity'
import { ProgressReport } from './pages/ProgressReport'
import { FAQ } from './pages/FAQ'

// Teacher pages
import { CreateAssessment } from './pages/CreateAssessment'
import { UploadMaterial } from './pages/UploadMaterial'
import { StudentsList } from './pages/StudentsList'

// Admin pages
import { ManageUsers } from './pages/ManageUsers'
import { ManageMaterials } from './pages/ManageMaterials'
import { SystemSettings } from './pages/SystemSettings'

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {user?.role === 'admin' && <AdminDashboard />}
            {user?.role === 'teacher' && <TeacherDashboard />}
            {user?.role === 'student' && <StudentDashboard />}
          </ProtectedRoute>
        }
      />

      {/* Teacher routes */}
      <Route
        path="/assessments"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <CreateAssessment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/materials"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            {user?.role === 'teacher' && <UploadMaterial />}
            {user?.role === 'admin' && <ManageMaterials />}
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <StudentsList />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SystemSettings />
          </ProtectedRoute>
        }
      />

      {/* Student routes */}
      <Route
        path="/reading-activity"
        element={
          <ProtectedRoute>
            <ReadingActivity />
          </ProtectedRoute>
        }
      />

      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <ProgressReport />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faq"
        element={
          <ProtectedRoute>
            <FAQ />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ProgressReport />
          </ProtectedRoute>
        }
      />

      {/* Default routes */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
