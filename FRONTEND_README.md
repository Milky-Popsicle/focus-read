# FocusRead - Online Reading Assessment and Monitoring System

A modern full-stack web application for assessing and monitoring students' reading skills and progress.

## Project Structure

```
focus-read/
├── src/                          # Backend (NestJS)
│   ├── auth/                     # Authentication module
│   ├── users/                    # User management
│   ├── students/                 # Student management
│   ├── teachers/                 # Teacher management
│   ├── assessments/              # Reading assessments
│   ├── reading-materials/        # Reading content management
│   ├── results/                  # Assessment results
│   ├── reports/                  # Progress reports
│   ├── app.module.ts
│   ├── main.ts
│   └── ...
├── frontend/                     # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── pages/               # Page components
│   │   │   ├── Login.tsx        # Login page
│   │   │   ├── Register.tsx     # Registration page
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── TeacherDashboard.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── ReadingActivity.tsx
│   │   │   └── ProgressReport.tsx
│   │   ├── components/          # Reusable components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── context/             # Auth context
│   │   ├── services/            # API service
│   │   ├── styles/              # Global styles
│   │   └── App.tsx
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── package.json
└── README.md
```

## Tech Stack

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **In-Memory Storage** - No database yet (easy to add TypeORM/Prisma)

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Modern CSS** - Flexbox, Grid, responsive design

## Features

### 1. Authentication System
- **Login Page** - Email and password login
- **Registration Page** - Create new user account with role selection
- **Role-Based Access** - Admin, Teacher, Student
- **JWT Token** - Fake JWT for now (can be replaced with real implementation)

### 2. Admin Dashboard
- View system statistics (total users, teachers, students, materials)
- Quick actions menu
- User management
- Material management
- System access

### 3. Teacher Dashboard
- View assigned students
- Monitor student progress
- Create and manage assessments
- Upload reading materials
- Generate performance reports
- View student submissions

### 4. Student Dashboard
- View assigned reading tasks
- Track completion status
- Monitor overall progress
- View performance metrics
- Progress visualization with charts

### 5. Reading Activity
- Read passages with pagination
- Comprehension questions
- Multiple choice assessments
- Real-time answer tracking
- Score calculation

### 6. Progress Report
- Assessment history
- Performance by category
- Score visualization
- Progress analytics
- Recommendations and insights

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run start:dev
```

Backend runs on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

Frontend runs on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /auth/register` - Create new user
- `POST /auth/login` - User login

### Users
- `POST /users` - Create user
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID

### Students
- `POST /students` - Create student
- `GET /students` - List students
- `GET /students/:id` - Get student by ID

### Teachers
- `POST /teachers` - Create teacher
- `GET /teachers` - List teachers
- `GET /teachers/:id` - Get teacher by ID

### Reading Materials
- `POST /reading-materials` - Create material
- `GET /reading-materials` - List materials
- `GET /reading-materials/:id` - Get material by ID

### Assessments
- `POST /assessments` - Create assessment
- `GET /assessments` - List assessments
- `GET /assessments/:id` - Get assessment by ID

### Results
- `POST /results` - Record assessment result
- `GET /results` - List results
- `GET /results/:id` - Get result by ID

### Reports
- `POST /reports` - Create progress report
- `GET /reports` - List reports

## Default Test Credentials

You can use any credentials to create an account since validation is minimal.

**Example:**
- Email: `student@example.com`
- Password: `password`
- Role: Student

## User Roles

### Admin
- Manage users and system settings
- View system statistics
- Access all materials and reports

### Teacher
- Create and manage assessments
- Upload reading materials
- Monitor student progress
- Generate reports
- Assign tasks

### Student
- View assigned reading tasks
- Take assessments
- Track personal progress
- View reports

## Styling

The application uses a modern educational color palette:
- **Primary Color**: `#6366f1` (Indigo)
- **Secondary Color**: `#10b981` (Emerald)
- **Success**: `#10b981`
- **Danger**: `#ef4444`
- **Warning**: `#f59e0b`

All pages are fully responsive with Flexbox and CSS Grid.

## Component Library

### Reusable Components
- `Card` - Basic card component
- `StatCard` - Statistics card with icon
- `Header` - Page header with title
- `Sidebar` - Navigation sidebar
- `ProtectedRoute` - Route protection wrapper

## Next Steps

### Database Integration
To add a database (PostgreSQL/MySQL):

1. Install TypeORM or Prisma
```bash
npm install @nestjs/typeorm typeorm pg
```

2. Create entity models mirroring the current interfaces
3. Replace service implementations with repositories
4. Update controllers as needed

### JWT Authentication
Replace the fake JWT implementation with real authentication:
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
```

### Form Validation
Add class-validator for better validation:
```bash
npm install class-validator class-transformer
```

### Frontend Enhancements
- Add more detailed forms for creating assessments
- Add real charts and analytics (recharts, chart.js)
- Implement file uploads for materials
- Add notifications/toast messages
- Add dark mode support

## Building for Production

### Backend
```bash
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Notes

- Currently uses in-memory storage; data is reset on server restart
- Authentication uses fake JWT tokens; implement real JWT for production
- API is accessible from both backend and frontend on `localhost:3000`
- Frontend proxies API calls to avoid CORS issues during development

## License

UNLICENSED

## Support

For issues or feature requests, please refer to the FocusReadSpecification document.
