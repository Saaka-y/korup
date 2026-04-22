## APIエンドポイント設計

認証は Simple JWT を使い、access_token と refresh_token を HttpOnly Cookie に保存する構成。
フロントは credentials: include を付けて API を呼び、Cookie はブラウザが自動送信。

### CustomAuthアプリ
- 実装済み
	- `POST /api/custom_auth/jwt/create/`
		- ログイン用 API
		- username / password を受け取り、認証成功時にサーバー側で access_token と refresh_token を HttpOnly Cookie に設定
	- `POST /api/custom_auth/jwt/logout/`
		- ログアウト用 API
		- refresh_token を blacklist に入れ、access_token / refresh_token の Cookie を削除
	- `POST /api/custom_auth/jwt/refresh/`
		- access_token 再発行用 API
		- request body ではなく Cookie 内の refresh_token を読み、新しい access_token を HttpOnly Cookie に再設定
	- `POST /api/custom_auth/jwt/verify/`
		- トークン検証用 API

### Accountアプリ
- 実装済み
	- `GET /api/user/me/`
		- ログイン中ユーザーの情報を取得
		- IsAuthenticated が必要
		- 現在は username / role のみを返す

### Trajectoryアプリ
- 実装済み
	- `GET /api/trajectory/latest_report`
		- 最新レポート全体を取得
		- IsAuthenticated が必要
		- role が student のユーザーだけ利用可能
- 未実装（予定）
	- `GET /api/trajectory/reports` - 全レポート取得
	- `GET /api/trajectory/curriculums` - 過去全カリキュラム取得
	- `GET /api/trajectory/current_term_curriculum` - 最新カリキュラム取得
	- `GET /api/trajectory/lesson_materials` - レッスン使用教材取得（PDF表示）
	- `GET /api/trajectory/daily_task_qa` - 自己学習の質問と回答取得

### ActionPlanアプリ
- 未実装（予定）
	- `POST /api/action_plan/submit` - アクションプラン提出
	- `GET /api/action_plan/action_plan` - アクションプラン全体取得
	- `GET /api/action_plan/current_term_action_plan` - 現在の期間のアクションプラン取得

### DailyTaskアプリ
- 未実装（予定）
	- `POST /api/daily_task/submit_questions` - 自己学習の質問提出
	- `GET /api/daily_task/completed_task_rate` - 自己学習完了率取得（%表示・週ごと）
	- 備考: シャドーイング / 瞬間英作文 / 音読 / ボキャブラリー / AI英会話 課題は「Try」を押すとモーダルでやり方とリンク表示、終わったらチェックをつける形式を想定

### Reviewアプリ
- 未実装（予定）
	- `POST /api/review/lesson_note` - レッスンノート作成（vocabularies も同時に作成）
	- `GET /api/review/latest_lesson_note` - 最新レッスンノート取得
	- `GET /api/review/vocabularies` - 語彙リスト取得


