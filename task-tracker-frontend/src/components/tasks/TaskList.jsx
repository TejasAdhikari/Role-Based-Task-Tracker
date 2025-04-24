import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { TaskFilter } from './TaskFilter';
import { useAuth } from '../../hooks/useAuth';
import * as taskService from '../../services/taskService';
import { RoleGate } from '../auth/RoleGate';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';


// This component displays a list of tasks, allowing users to create, update, and delete tasks.
export const TaskList = () => {
    // useAuth hook to access authentication context.
    const { user } = useAuth();
    // useQueryClient hook to manage query cache.
    const queryClient = useQueryClient();
    // State variables to manage task form visibility and editing state.
    const [showForm, setShowForm] = useState(false);
    const [editTask, setEditTask] = useState(null);
    // State variable to manage order of the tasks.
    const [orderedTasks, setOrderedTasks] = useState([]);
    // State variable to manage task status filter.
    const [statusFilter, setStatusFilter] = useState('all');
    

    // Fetch tasks
    const { data: tasks = [], isLoading } = useQuery({ 
        queryKey: ['tasks'], 
        queryFn: taskService.getTasks 
    });

    // Create task mutation
    const createMutation = useMutation({
        mutationFn: taskService.createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setShowForm(false);
        }
    });

    // Update task mutation
    const updateMutation = useMutation({
        mutationFn: (params) => taskService.updateTask(params.id, params.task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setEditTask(null);
        }
    });

    // Delete task mutation
    const deleteMutation = useMutation({
        mutationFn: taskService.deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

    // Handle task creation.
    const handleCreateTask = (task) => {
        createMutation.mutate(task);
    };

    // Handle task update.
    const handleUpdateTask = (id, task) => {
        updateMutation.mutate({ id, task });
    };

    // Handle task deletion.
    const handleDeleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteMutation.mutate(id);
        }
    };

    // Handle task status change.
    const handleStatusChange = (id, status) => {
        updateMutation.mutate({ id, task: { status } });
    };

    // Filter tasks based on the selected status filter.
    const filteredTasks = tasks.filter(task => {
        if (statusFilter === 'all') return true;
        return task.status === statusFilter;
    });

    // If tasks are being loaded, show a loading message.
    if (isLoading) {
        return <div className="text-center py-4">Loading tasks...</div>;
    }

    // Render the task list, including the task form and filter options.
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Task List</h2>
            <div className="flex space-x-4">
            <TaskFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
            <RoleGate role={user?.role} allowed={['submitter']}>
                <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                >
                Create Task
                </button>
            </RoleGate>
            </div>
        </div>

        {filteredTasks.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No tasks found</p>
            </div>
        ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {filteredTasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    userRole={user.role}
                    userId={user.id}
                    userName={user.name}
                    onEdit={setEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                />
                ))}
            </ul>
            </div>
        )}

        {showForm && (
            <TaskForm
                onSubmit={handleCreateTask}
                onCancel={() => setShowForm(false)}
            />
        )}

        {editTask && (
            <TaskForm
            task={editTask}
            onSubmit={(task) => handleUpdateTask(editTask.id, task)}
            onCancel={() => setEditTask(null)}
            />
        )}
        </div>
    );
};