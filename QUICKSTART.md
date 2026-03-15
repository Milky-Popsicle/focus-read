# FocusRead - Quick Start Guide

## Starting the Application

You need to run **both** the backend and frontend servers.

### Terminal 1: Backend Server
```bash
# From the project root (c:\Users\Admin'\focus-read)
npm run start:dev
```
- Backend runs on: `http://localhost:3000`
- Uses NestJS with watch mode

### Terminal 2: Frontend Server
```bash
# From the frontend directory
cd frontend
npm run dev
```
- Frontend runs on: `http://localhost:3001`
- Uses Vite with hot module replacement

## Accessing the Application

Once both servers are running:

1. Open your browser and go to: `http://localhost:3001`
2. You'll see the **Login** page

## Testing the Application

### Step 1: Register a New Account
1. Click "Create one" on the login page
2. Fill in the registration form:
   - **Name**: Any name (e.g., "John Teacher")
   - **Email**: Any email (e.g., "teacher@example.com")
   - **Role**: Select the role:
     - **Student** - Access student dashboard and reading activities
     - **Teacher** - Access teacher dashboard and assessment creation
     - **Admin** - Access admin dashboard and system management
   - **Password**: Any password (e.g., "password123")

3. Click "Create Account"
4. You'll be redirected to the dashboard based on your role

### Step 2: Explore the Dashboard

#### **For Students:**
- View assigned tasks and their status
- See progress metrics
- Click on a task to read and take the assessment
- View detailed progress reports

#### **For Teachers:**
- See your students and their submissions
- View student performance
- Quick actions to create assessments and upload materials
- Generate performance reports

#### **For Admins:**
- View system statistics
- Manage users, materials, and system settings
- Quick access to all system features

### Step 3: Try the Reading Activity
1. Navigate to "Reading Activity" (if available in your role)
2. Read the provided passage
3. Answer the comprehension questions
4. Submit the assessment
5. View your score

### Step 4: Check Progress Reports
1. Navigate to "Reports" or "Progress" (depending on role)
2. View your comprehensive performance analytics
3. See breakdown by category
4. Read recommendations

## Testing Different Roles

### Create Multiple Accounts
To test different user roles, open the app in multiple browser tabs or windows:

1. **Tab 1: Student Account**
   - Register/login as a student
   - Explore student features

2. **Tab 2: Teacher Account**
   - Register/login as a teacher
   - View teacher-specific features

3. **Tab 3: Admin Account**
   - Register/login as an admin
   - Access admin features

## API Testing with Curl

You can also test the backend API directly:

### Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Get All Users
```bash
curl http://localhost:3000/users
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Features to Test

### 1. Authentication
- ✓ Register new account
- ✓ Login with credentials
- ✓ Logout functionality
- ✓ Protected routes (can't access without login)

### 2. Dashboard (Role-Based)
- ✓ Admin dashboard with system stats
- ✓ Teacher dashboard with student overview
- ✓ Student dashboard with progress tracking

### 3. Sidebar Navigation
- ✓ Navigation based on user role
- ✓ Mobile responsive hamburger menu
- ✓ User info and logout button

### 4. Reading Activity
- ✓ Read passages with pagination
- ✓ Answer comprehension questions
- ✓ Submit assessment
- ✓ Score calculation

### 5. Progress Reports
- ✓ View assessment history
- ✓ Performance analytics
- ✓ Category-wise breakdown
- ✓ Recommendations

### 6. Responsive Design
- ✓ Desktop view (1920px+)
- ✓ Tablet view (768px - 1024px)
- ✓ Mobile view (< 768px)

## Troubleshooting

### Issue: Frontend can't connect to backend
**Solution**: 
- Make sure backend is running on `http://localhost:3000`
- Check that there's no port conflict
- Vite proxy is configured to forward `/api` calls to backend

### Issue: "Cannot find module" errors
**Solution**:
- Run `npm install` in the frontend directory
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Issue: Data not persisting after refresh
**Note**: This is expected behavior. The application uses in-memory storage, so data is reset when the server restarts.

### Issue: Styles not loading properly
**Solution**:
- Hard refresh the browser (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)
- Clear browser cache

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Tips

### Frontend Development
- Use React DevTools browser extension for debugging
- Check the console for API errors
- Use Network tab to monitor API calls

### Backend Development
- Install REST Client extension in VS Code
- Use debug mode for breakpoints
- Monitor the console for server logs

## Next Steps

After exploring the app:

1. **Add Database**: Integrate PostgreSQL/MySQL with TypeORM
2. **Real Authentication**: Implement real JWT tokens
3. **File Upload**: Allow teachers to upload materials
4. **Notifications**: Add toast notifications for user feedback
5. **Advanced Charts**: Add graphs for progress visualization
6. **Email Integration**: Send notifications to users

## File Structure Quick Reference

```
Key Frontend Files:
- src/App.tsx           - Main app with routing
- src/pages/            - All page components
- src/components/       - Reusable components
- src/services/api.ts   - API client
- src/context/          - Auth context
- src/styles/           - Global styles

Key Backend Files:
- src/auth/             - Auth module
- src/users/            - Users module
- src/app.module.ts     - Root module
- src/main.ts           - Entry point
```

## Contact & Support

For detailed specifications, see `FocusReadSpecification` file.
For backend details, see `README.md` in the project root.
