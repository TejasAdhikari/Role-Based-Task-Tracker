# Role-Based Task Tracker

A full-stack web application that implements role-based access control (RBAC) for a task management system.

## Features

- User authentication with role-based access (submitter/approver)
- Task creation, editing, and deletion
- Status workflow (pending → approved/rejected → done)
- Role-based permissions
- Task filtering by status

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Query, React Router
- **Backend**: Express.js, JSON file storage
- **Testing**: Jest, React Testing Library, Supertest

## Setup & Run Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Getting Started

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/yourusername/role-based-task-tracker.git
cd role-based-task-tracker
npm install