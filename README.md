# Role-Based Task Tracker

A full-stack web application that implements role-based access control (RBAC) for a task management system. This app allows submitters to create tasks and approvers to review them, simulating real-world multi-user workflows.

## 📋 Features

- **Role-Based Authentication**: Switch between submitter and approver roles
- **Task Management**:
  - Submitters can create, edit, and delete their pending tasks
  - Approvers can review pending tasks and update their status
- **Status Workflow**: Tasks progress through pending → approved/rejected → done
- **Filtering**: Filter tasks by status (pending, approved, rejected, done)
- **Drag & Drop**: Reorder tasks by dragging them (role-appropriate permissions enforced)
- **Audit Trail**: Track task creation date/time and creator

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Navigation and routing
- **Tanstack Query** - Data fetching and state management
- **@hello-pangea/dnd** - Drag and drop functionality

### Backend
- **Express.js** - Node.js web framework
- **JSON Storage** - Lightweight file-based data persistence
- **JWT Authentication** - Token-based auth with role information

### DevOps
- **Docker** - Containerization for easy deployment
- **Docker Compose** - Multi-container orchestration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Docker and Docker Compose (optional)

### Running Locally

1. **Run the complete application with Docker**:
   ```bash
   docker-compose up --build
   ```
   Access the application at http://localhost:3000

### Alternative Setup (Without Docker)

1. **Start the backend**:
   ```bash
   cd task-tracker-backend
   npm install
   npm start
   ```

2. **Start the frontend**:
   ```bash
   cd task-tracker-frontend
   npm install
   npm start
   ```
   Access the application at http://localhost:3000

## 🧪 Testing

Run backend tests:
```bash
cd task-tracker-backend
npm test
```

Run frontend tests:
```bash
cd task-tracker-frontend
npm test
```

## 👥 User Roles & Permissions

### Submitter
- Can create new tasks (status defaults to 'pending')
- Can view, edit, or delete their own pending tasks
- Cannot modify tasks created by others
- Cannot change task status

### Approver
- Can view all tasks
- Can change status of pending tasks to 'approved' or 'rejected'
- Can change status of approved tasks to 'done'
- Cannot edit task content (title/description)
- Cannot create or delete tasks

## 🔄 Task Status Flow

```
[Submitter] → Creates Task (pending)
    ↓
[Approver] → Reviews Task → Approves or Rejects
    ↓
[Approver] → Marks Approved Task as Done
```

## 📂 Project Structure

### Frontend
```
task-tracker-frontend/
├── src/
│   ├── components/
│   │   ├── auth/        # Login and role-based components
│   │   ├── layout/      # Page layout components
│   │   └── tasks/       # Task management components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   └── services/        # API service functions
└── Dockerfile
```

### Backend
```
task-tracker-backend/
├── data/               # JSON storage files
├── routes/             # API route handlers
├── middleware/         # Auth middleware
└── Dockerfile
```

## 🔒 Authentication

This application uses a simplified JWT-based authentication system:
- Tokens contain the user's ID, name, and role
- The RoleGate component controls UI access based on user role
- Server-side middleware validates permissions on all API calls

## 👨‍💻 Default Users

- **Submitter**: Tejas (Submitter) (ID: 1), Donald (Submitter) (ID: 3)
- **Approver**: Chenwei Approver (ID: 2)
