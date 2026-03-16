
## APIエンドポイント設計

### CustomAuthアプリ
- 実装済み
	- `POST /api/custom_auth/jwt/create/` - ログイン（JWTトークン作成、Cookie設定）
	- `POST /api/custom_auth/jwt/logout/` - ログアウト（Cookie削除）
	- `POST /api/custom_auth/jwt/refresh/` - アクセストークン再発行
	- `POST /api/custom_auth/jwt/verify/` - トークン検証

### Accountアプリ
- 実装済み
	- `GET /api/user/me/` - ログイン後のユーザ情報取得

### Trajectoryアプリ
- 実装済み
	- `GET /api/trajectory/latest_goal` - 最新目標取得
	- `GET /api/trajectory/latest_report` - 最新レポート全体取得
- 未実装（予定）
	- `GET /api/trajectory/reports` - 全レポート取得
	- `GET /api/trajectory/curriculums` - 過去全カリキュラム取得
	- `GET /api/trajectory/current_term_curriculum` - 最新カリキュラム取得
	- `GET /api/trajectory/lesson_materials` - レッスン使用教材取得（PDF表示）


### ActionPlanアプリ
- 未実装（予定）
	- `POST /api/action_plan/submit` - アクションプラン提出
	- `GET /api/action_plan/action_plans` - アクションプラン全体取得
	- `GET /api/action_plan/current_term_action_plan` - 現在の期間のアクションプラン取得



### DailyTaskアプリ
- 未実装（予定）
	- `POST /api/daily_task/submit_task` - 課題提出
	- `GET /api/daily_task/submitted_tasks` - 提出済み課題取得
	- 備考: シャドーイング/瞬間英作文/音読/ボキャブラリー課題はAPI定義のみ


### Reviewアプリ
- 未実装（予定）
	- `POST /api/review/lesson_note` - レッスンノート作成（vocabulariesも同時に作成）
	- `GET /api/review/latest_lesson_note` - 最新レッスンノート取得
	- `GET /api/review/vocabularies` - 語彙リスト取得


