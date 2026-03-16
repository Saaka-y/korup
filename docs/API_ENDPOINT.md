
## APIエンドポイント設計

### CustomAuthアプリ
- `POST /api/custom_auth/jwt/create` - ログイン（JWTトークン作成）
- `POST /api/custom_auth/jwt/logout` - ログアウト（Cookie削除）

### Accountアプリ
- `GET /api/user/me` - ログイン後のユーザ情報取得

### Trajectoryアプリ
<!-- レポート管理 -->
- `GET /api/trajectory/latest_goal` - 最新目標取得
- `GET /api/trajectory/latest_report` - 最新レポート全体取得
- `GET /api/trajectory/reports` - 全レポート取得

<!-- カリキュラム管理 -->
- `GET /api/trajectory/curriculums` - 過去全カリキュラム取得

<!-- レッスン使用教材管理-->
- `GET /api/trajectory/lesson_materials` - レッスン使用教材取得（PDF表示）


### ActionPlanアプリ
<!-- アクションプラン管理 -->
- `POST /api/action_plan/submit` - アクションプラン提出
- `GET /api/action_plan/action_plans` - アクションプラン全体取得
- `GET /api/action_plan/current_term_action_plan` - 現在の期間のアクションプラン取得

<!-- カリキュラム管理 -->
- `GET /api/action_plan/current_term_curriculum` - 最新カリキュラム取得



### Taskアプリ
<!-- daily タスクの作成 -->
- シャドーイング、瞬間英作文、音読、ボキャブラリーの課題作成、表示
- AIによる音声英会話の自動生成（chatGPT のAPI？）

<!-- daily タスク管理 -->
- `POST /api/trajectory/submit_task` - 課題提出
- `GET /api/trajectory/submitted_tasks` - 提出済み課題取得


### Reviewアプリ
- `POST /api/review/lesson_note` - レッスンノート作成（vocabulariesも同時に作成）
- `GET /api/review/latest_lesson_note` - 最新レッスンノート取得
- `GET /api/review/vocabularies` - 語彙リスト取得


