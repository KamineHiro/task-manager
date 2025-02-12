# タスク管理アプリ

## 概要
シンプルで使いやすいタスク管理アプリケーションです。React + TypeScriptで構築されたフロントエンド、Express + PostgreSQLで構築されたバックエンドを備えています。

## 機能
- タスクの作成、編集、削除
- タスクのステータス管理（未着手、進行中、完了）
- レスポンシブデザイン
- リアルタイムでのタスク更新

## 技術スタック
### フロントエンド
- React
- TypeScript
- Tailwind CSS
- Vite

### バックエンド
- Node.js
- Express
- PostgreSQL
- Docker

## 開発環境のセットアップ

### 必要条件
- Node.js 20.x
- Docker & Docker Compose
- npm

### インストール手順
1. リポジトリのクローン:
```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

2. 依存関係のインストール:
```bash
npm install
```

3. 環境変数の設定:
`.env`ファイルを作成し、必要な環境変数を設定:
```
VITE_API_URL=http://localhost:3000/api
```

4. Dockerコンテナの起動:
```bash
docker-compose up
```

5. アプリケーションの起動:
```bash
# フロントエンド開発サーバー
npm run dev

# バックエンドサーバー
npm run start:server
```

## 使用方法
1. ブラウザで `http://localhost:5173` にアクセス
2. タスクの追加は上部フォームから行えます
3. 各タスクは編集、削除、ステータス変更が可能です

## データベース
PostgreSQLデータベースは自動的にマイグレーションを実行し、必要なテーブルを作成します。

## 作成者
赤嶺　紘基

