import React from 'react';
import { RoleGate } from '../auth/RoleGate';


// This component represents a single task item in the task list.
export const TaskItem = ({
    task,
    userRole,
    userId,
    userName,
    onEdit,
    onDelete,
    onStatusChange
}) => {
    // Helper function to format date.
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Helper function to get status badge color.
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'done':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <li className="px-6 py-4">
            <div className="flex items-center">
                <div className="text-gray-400 cursor-move mr-3">  
                    ⋮⋮
                </div>
                <div className="flex justify-between items-start w-full">
                    <div className="flex-1">
                        <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                            {task.status}
                            </span>
                        </div>
                        {task.description && (
                            <p className="mt-1 text-gray-600">{task.description}</p>
                        )}
                        <div className="mt-2 text-sm text-gray-500">
                            Created at {formatDate(task.createdAt)} by {task.createdByName || 'User'}
                        </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4 justify-end">
                        {/* Edit button - only for submitters with their own pending tasks */}
                        <RoleGate role={userRole} allowed={['submitter']}>
                            {task.createdBy === userId && task.status === 'pending' && (
                            <button
                                onClick={() => onEdit(task)}
                                className="p-1 text-indigo-600 hover:text-indigo-900"
                            >
                                Edit
                            </button>
                            )}
                        </RoleGate>

                        {/* Delete button - only for submitters with their own pending tasks */}
                        <RoleGate role={userRole} allowed={['submitter']}>
                            {task.createdBy === userId && task.status === 'pending' && (
                            <button
                                onClick={() => onDelete(task.id)}
                                className="p-1 text-red-600 hover:text-red-900"
                            >
                                Delete
                            </button>
                            )}
                        </RoleGate>

                        {/* Approve/Reject buttons - only for approvers on pending tasks */}
                        <RoleGate role={userRole} allowed={['approver']}>
                            {task.status === 'pending' && (
                            <>
                                <button
                                onClick={() => onStatusChange(task.id, 'approved')}
                                className="p-1 text-green-600 hover:text-green-900"
                                >
                                Approve
                                </button>
                                <button
                                onClick={() => onStatusChange(task.id, 'rejected')}
                                className="p-1 text-red-600 hover:text-red-900"
                                >
                                Reject
                                </button>
                            </>
                            )}
                        </RoleGate>

                        {/* Mark as Done button - only for approvers on approved tasks */}
                        <RoleGate role={userRole} allowed={['approver']}>
                            {task.status === 'approved' && (
                            <button
                                onClick={() => onStatusChange(task.id, 'done')}
                                className="p-1 text-blue-600 hover:text-blue-900"
                            >
                                Mark Done
                            </button>
                            )}
                        </RoleGate>
                    </div>
                </div>
            </div>
        </li>
    );
};