import React from 'react';
import { Task, TaskStatus } from '../types/task';
import { Pencil, Trash2 } from 'lucide-react';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: number, status: TaskStatus) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const statusColors = {
  Todo: 'bg-yellow-100 text-yellow-800',
  Progress: 'bg-blue-100 text-blue-800',
  Done: 'bg-green-100 text-green-800',
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onStatusChange,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
            className={clsx(
              'rounded px-2 py-1 text-sm font-medium',
              statusColors[task.status]
            )}
          >
            <option value="Todo">未着手</option>
            <option value="Progress">進行中</option>
            <option value="Done">完了</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Pencil className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};