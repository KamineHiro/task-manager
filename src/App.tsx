import { useEffect, useState } from 'react';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { Task, TaskStatus } from './types/task';
import { ClipboardList } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error('タスクの取得に失敗しました');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (title: string, status: TaskStatus) => {
    try {
      if (editingTask) {
        const response = await fetch(`${API_URL}/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, status }),
        });

        if (!response.ok) throw new Error('タスクの更新に失敗しました');
        const updatedTask = await response.json();

        setTasks(tasks.map(task => 
          task.id === editingTask.id ? updatedTask : task
        ));
        setEditingTask(null);
      } else {
        const response = await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, status }),
        });

        if (!response.ok) throw new Error('タスクの作成に失敗しました');
        const newTask = await response.json();
        setTasks([newTask, ...tasks]);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleStatusChange = async (id: number, status: TaskStatus) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: task.title, status }),
      });

      if (!response.ok) throw new Error('ステータスの更新に失敗しました');
      const updatedTask = await response.json();

      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('タスクの削除に失敗しました');
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <ClipboardList className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">タスク管理</h1> 
          </div>
          
          <TaskForm 
            onSubmit={handleCreateTask}
            editingTask={editingTask}
            onCancel={editingTask ? () => setEditingTask(null) : undefined}
          />

          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
            {tasks.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                タスクがありません。新しいタスクを作成してください！
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;