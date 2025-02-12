import express from 'express';
import cors from 'cors';
import pg from 'pg';
const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// PostgreSQLの接続設定
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'taskapp',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'taskmanagement',
  password: process.env.POSTGRES_PASSWORD || 'taskapp123',
  port: 5432,
});

// 基本的なルート
app.get('/', (_, res) => {
  res.json({ message: 'Task Management API' });
});

// タスク一覧の取得
app.get('/api/tasks', async (_, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'データベースエラー' });
  }
});

// タスクの作成
app.post('/api/tasks', async (req, res) => {
  const { title, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *',
      [title, status]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'データベースエラー' });
  }
});

// タスクの更新
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = COALESCE($1, title), status = COALESCE($2, status) WHERE id = $3 RETURNING *',
      [title, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'タスクが見つかりません' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'データベースエラー' });
  }
});

// タスクの削除
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: '削除成功' });
  } catch (error) {
    res.status(500).json({ error: 'データベースエラー' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});