import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types/task';

interface TaskFormProps {
  onSubmit: (title: string, status: TaskStatus) => void;
  editingTask?: Task | null;
  onCancel?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  editingTask,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Todo');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), status);
      setTitle('');
      setStatus('Todo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            タスク名
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="タスクを入力してください"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            ステータス
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Todo">未着手</option>
            <option value="Progress">進行中</option>
            <option value="Done">完了</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {editingTask ? 'タスクを更新' : 'タスクを追加'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              キャンセル
            </button>
          )}
        </div>
      </div>
    </form>
  );
};