import './Card.css'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div className={`card ${className || ''}`} onClick={onClick}>
      {children}
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color?: string
}

export const StatCard = ({ icon, label, value, color = 'primary' }: StatCardProps) => {
  return (
    <Card className={`stat-card stat-card-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </Card>
  )
}

interface HeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export const Header = ({ title, subtitle, action }: HeaderProps) => {
  return (
    <div className="page-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      {action && <div className="header-action">{action}</div>}
    </div>
  )
}
