// タスクのステータス
export type TaskStatus = 'Todo' | 'Progress' | 'Done';

// タスクの型
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  creates_at: string;
  updated_at: string;
}

// タスクの作成時の入力型
export interface CreateTaskInput {
  title: string;
  status: TaskStatus;
}