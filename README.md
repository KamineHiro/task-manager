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
`.env`ファイルを作成し、必要な環境変数を設定してください:
```
# フロントエンド設定
VITE_API_URL=http://localhost:3000/api
VITE_APP_URL=http://localhost:5173

# バックエンド設定
PORT=3000
POSTGRES_USER=taskapp
POSTGRES_PASSWORD=<あなたの安全なパスワード>
POSTGRES_DB=taskmanagement
POSTGRES_HOST=localhost
```

注意: 
- セキュリティのため、`POSTGRES_PASSWORD`は必ず変更してください
- `.env`ファイルは`.gitignore`に含まれており、GitHubにアップロードされません

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

## 開発環境の起動方法

### 方法1: Dockerを使用する場合
1. `.env`ファイルの設定を変更:
```
POSTGRES_HOST=db  # DockerのサービスホストはDBコンテナ名
```

2. Dockerコンテナを起動:
```bash
docker-compose up
```

これでバックエンドサーバーとデータベースが自動的に起動します。
- データベースは`5433`ポートでホストにマップされます
- データはDockerボリューム（postgres_data）に保存されます

### 方法2: ローカルで直接起動する場合
1. `.env`ファイルの設定を確認:
```
POSTGRES_HOST=localhost  # ローカルホストを使用
```

2. PostgreSQLを起動（別途インストールが必要）
   - デフォルトポート`5432`を使用

3. バックエンドサーバーを起動:
```bash
npm run start:server
```

4. フロントエンド開発サーバーを起動:
```bash
npm run dev
```

注意：
- Docker版とローカル版では別のデータベースインスタンスが使用されます
- それぞれのデータは独立して保存されます
- 開発中は一貫性のために、どちらか一方の環境を選んで使用することをお勧めします

## 使用方法
1. ブラウザで `http://localhost:5173` にアクセス
2. タスクの追加は上部フォームから行えます
3. 各タスクは編集、削除、ステータス変更が可能です

## データベース
PostgreSQLデータベースは自動的にマイグレーションを実行し、必要なテーブルを作成します。

## 作成者
赤嶺　紘基

