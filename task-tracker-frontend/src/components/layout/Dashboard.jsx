import React from 'react';
import { Header } from './Header';
import { TaskList } from '../tasks/TaskList';


// This component serves as the main layout for the dashboard, including the header and task list.
// It is a functional component that uses React hooks and imports other components for modularity.
export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <TaskList />
      </main>
    </div>
  );
};