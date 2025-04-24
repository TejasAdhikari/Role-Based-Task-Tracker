import React from 'react';


// This component is used to filter tasks based on their status.
export const TaskFilter = ({ statusFilter, setStatusFilter }) => {
    // Render a select dropdown for filtering tasks by status.
    return (
        <div className="flex items-center">
        <label htmlFor="status-filter" className="mr-2 text-sm font-medium text-gray-700">
            Status:
        </label>
        <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="done">Done</option>
        </select>
        </div>
    );
};