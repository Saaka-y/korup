

## 🗄️ データベース設計（概要）

### DB確認方法（SQLite / Django）

DBファイルは backend/db.sqlite3（開発段階）

1. SQLiteで直接確認

```bash
cd /Users/saaka/Projects/korup/backend
sqlite3 db.sqlite3
```

2. 接続先とテーブル一覧

```sql
.databases
.tables
```

3. メタ情報（定義・列・外部キー・インデックス）

```sql
.schema account_student
PRAGMA table_info('account_student');
PRAGMA foreign_key_list('trajectory_report');
PRAGMA index_list('account_student');
```

4. 実データ確認（idとFKの対応）

```sql
SELECT id, user_id, student_number, status FROM account_student ORDER BY id DESC LIMIT 20;

SELECT id, student_id, created_at, is_sent FROM trajectory_report ORDER BY id DESC LIMIT 20;

```

5. 終了

```sql
.quit
```

補足: ForeignKeyやOneToOneFieldは、DB上では field_name_id という列名で保存される（例: student_id, user_id）。

### 主要テーブル

#### Accountアプリ（ユーザー管理）
- User
- Student（Userと1対1で紐付け）
- Tutor（Userと1対1で紐付け）

**設計方針**: name/emailはUserモデルに集約し、Student/Tutorは業務データのみを保持。バックエンドはCookieのJWTからrequest.userを特定し、request.user.student_profile / request.user.tutor_profileでアクセスする。student_number / tutor_numberはフロントに渡さない（フロントがURLクエリで番号を持つとCookieによる認証の意味が薄れるため）。


#### Bookingアプリ（予約管理）
- Plan（Studentモデルと紐付け。Planに生徒の情報はない）
- Transaction（生徒のプラン購入情報の大元。Planから参照してsnapshotとして保存することで、Planを変更しても過去の取引情報が保持される）
- LessonStatus（クライアント側向けデータ。Studentのstatusが"graduated"または"hold"の場合は残レッスン数を非表示とする仕様）
- Schedule（コーチ側の予約可能スロット。予約が入るとLessonStatusを追加、または更新。）
- TutorSchedule（Conversation Classの予約可能スロット。予約が入るとLessonStatusを追加、または更新。）
- TenTalk（TenTalkの予約情報。生徒と紐付け、予約日時を管理、完了フラグ）

【設計ポイント】
- Schedule/TutorScheduleは「空きスロット」を管理し、予約が入るとLessonStatusと紐付けて生徒名や予約済み状態を管理する。
- バッファタイムや30分ごとの予約時間設定などは、フロント側で管理。
- LessonStatusは生徒ごとの予約情報（日時・リンク・完了状況、Conversation Class進捗など）を管理し、スロットから情報を取得する。
- カレンダーUIではSchedule/TutorScheduleの空き状況を表示し、生徒が選択して予約できる。

生徒に手動でチューターをアサイン後、チューター側で対応可能日時を登録できる。その後、自動で生徒のダッシュボードUI（account/page.tsxのNextLessonCardコンポーネントの「次のレッスンを予約しましょう！」）が「Conversation Classを予約しましょう！」に変わり、予約ページが反映される。


#### Chatアプリ
- Chat（生徒とのやり取り：文字ベース、ファイルなし。必須属性：message, vocabularies）

#### Trajectoryアプリ
- Report（クールごとの生徒レポート）
    - student: 生徒（FK → Student）
    - 実装済み
- Curriculum（過去カリキュラム）
    - 未実装（API_ENDPOINTの`/api/trajectory/curriculums`に合わせて定義予定）
- Material（レッスンで使った教材などファイルを保存）
    - 未実装（API_ENDPOINTの`/api/trajectory/lesson_materials`に合わせて定義予定）

#### ActionPlanアプリ
- ActionPlan（生徒のアクションプラン）
    - 未実装（API_ENDPOINTの`/api/action_plan/submit`, `/api/action_plan/action_plans`, `/api/action_plan/current_term_action_plan`に合わせて定義予定）



#### DailyTaskアプリ
- DailyTask
    - 未実装（API_ENDPOINTの`/api/daily_task/submit_task`, `/api/daily_task/submitted_tasks`に合わせて定義予定）

- ProgressLog（生徒の課題提出内容とAIによる添削結果を保存）

#### Reviewアプリ
- LessonNote（レッスンノート。vocabulariesも同時に作成）
- Vocabulary（レッスン内のnew words）


### リレーション全体図

```mermaid
erDiagram
    User ||--o| Student : "has_profile"
    User ||--o| Tutor : "has_profile"
    Student ||--o{ Transaction : "has"
    Transaction }o--|| Plan : "references(snapshot)"
    Student ||--o{ LessonStatus : "has"
    Schedule }o--|| LessonStatus : "links"
    TutorSchedule }o--|| LessonStatus : "links"
    Tutor ||--o{ TutorSchedule : "provides"
    Student ||--o{ TenTalk : "books"
    Transaction ||--o{ TenTalk : "references"
    User ||--o{ Schedule : "provides"
    Student ||--o{ Chat : "participates"
    Student ||--o{ Report : "has"
    Student ||--o{ Curriculum : "has(planned)"
    Student ||--o{ Material : "uses(planned)"
    Student ||--o| ActionPlan : "has"
    Student ||--o{ ActionPlanHistory : "has(planned)"
    Student ||--o{ DailyTask : "assigned"
    DailyTask ||--o{ ProgressLog : "tracks"
    Student ||--o{ LessonNote : "has"
    LessonNote ||--o{ Vocabulary : "contains"
    
```

---

### アプリ別詳細図

#### Accountアプリ（ユーザー管理）

```mermaid
erDiagram
    User ||--o| Student : "has_profile"
    User ||--o| Tutor : "has_profile"

    User {
        int id PK
        string username
        string email
        string password
        string first_name
        string last_name
        string role "student/tutor/admin"
    }

    Student {
        int id PK
        int user_id FK "OneToOne"
        int student_number UK "業務管理用・バックエンド内部のみ"
        string status "active/inactive/graduated/hold"
        int base_fee
        int special_fee
        int final_fee
        string payment_method "bank_transfer/credit_card"
        string level
        string occupation
        string lesson_goal
        string hobbies
        string referral
        text notes
    }

    Tutor {
        int id PK
        int user_id FK "OneToOne"
        int tutor_number UK "業務管理用・バックエンド内部のみ"
        int class_rate
        string invoice_url
        string payment_method "bank_transfer/paypal/other"
        string status "active/inactive/resigned"
    }
```

#### bookingアプリ（プラン・支払い管理）

```mermaid
erDiagram
    Student ||--o{ Transaction : "has"
    Transaction }o--|| Plan : "references"
    Transaction ||--o{ LessonStatus : "has"
    LessonStatus }o--|| Student : "belongs_to"
    Schedule }o--|| LessonStatus : "links"
    TutorSchedule }o--|| LessonStatus : "links"
    Student ||--o{ TenTalk : "books"
    Transaction ||--o{ TenTalk : "references"
    User ||--o{ Schedule : "provides"
    Tutor ||--o{ TutorSchedule : "provides"

    Plan {
        int id PK
        string plan_number UK
        string name
        int base_fee_bank
        int base_max_weeks
        int lessons "Coachとのレッスン数"
        int conversation_classes "Conversation Classのレッスン数"
        string ten_talk "TenTalkの利用制限"
        string correction_frequency "添削頻度"
        int base_fee_card "クレカ決済の月額料金"
        int fee_3m_bank "3ヶ月まとめ払いの振込料金"
        int fee_3m_card "3ヶ月まとめ払いのクレカ料金"
        int fee_6m_bank "6ヶ月まとめ払いの振込料金"
        int fee_6m_card "6ヶ月まとめ払いのクレカ料金"
    }

    Transaction {
        int id PK
        int student_id FK
        int plan_id FK
        datetime created_at "作成日時"
        string plan_number_snapshot "プラン番号"
        string plan_name_snapshot "プラン名"
        date payment_date "支払い日"
        string payment_method "支払い方法"
        int price_snapshot "支払い金額"
        int lesson_amount "レッスン数"
        int conversation_class_amount "Conversation Class数"
        string ten_talk_snapshot "TenTalk利用制限"
        string correction_frequency_snapshot "添削頻度"
        int max_weeks_snapshot "最大契約期間（週）"
        date period_start_date "プラン開始日"
        date period_end_date "プラン終了日"
        string status "completed/ongoing/not_consumed/suspended"
        boolean is_conversation_class_completed
        boolean receipt_issued
        text notes
        int completed_lessons "property: LessonStatusを参照して計算"
        int remaining_lessons "property: LessonStatusを参照して計算"
    }

    LessonStatus {
        int id PK
        int student_id FK
        int transaction_id FK
        datetime next_lesson_date
        boolean is_conversation_class
        string status "reserved/completed/canceled"
        string link "レッスンURL"
        int number_of_completed "property: 同じトランザクション内で完了したレッスン数"
        int remaining_lessons "property: Transactionからの残レッスン数を利用"
    }

    Schedule {
        int id PK
        int coach_id FK "User.id"
        datetime start_time
        datetime end_time
        string meeting_url
        boolean is_available
        int lesson_status_id FK
    }

    TutorSchedule {
        int id PK
        int tutor_id FK
        datetime start_time
        datetime end_time
        string zoom_url
        boolean is_available
        int lesson_status_id FK
    }

    TenTalk {
        int id PK
        int student_id FK
        int transaction_id FK
        datetime scheduled_date
        string zoom_url
        boolean is_completed
        text notes
    }

```

#### Bookingアプリ（予約管理）

```mermaid
erDiagram
    Student ||--o{ LessonStatus : "books"
    Transaction ||--o{ LessonStatus : "tracks"
    User ||--o{ Schedule : "provides"
    Tutor ||--o{ TutorSchedule : "provides"
    Schedule }o--|| LessonStatus : "links"
    TutorSchedule }o--|| LessonStatus : "links"

    LessonStatus {
        int id PK
        int student_id FK
        int transaction_id FK
        datetime next_lesson_date
        boolean is_conversation_class
        string status "reserved/completed/canceled"
        string link
    }

    Schedule {
        int id PK
        int coach_id FK "User.id"
        datetime start_time
        datetime end_time
        string meeting_url
        boolean is_available
        int lesson_status_id FK
    }

    TutorSchedule {
        int id PK
        int tutor_id FK
        datetime start_time
        datetime end_time
        string zoom_url
        boolean is_available
        int lesson_status_id FK
    }

    Student {
        int id PK
        int user_id FK
    }

    Transaction {
        int id PK
    }

    User {
        int id PK
    }

    Tutor {
        int id PK
        int user_id FK
    }
```

#### Trajectoryアプリ（レポート・教材管理）

```mermaid
erDiagram
    Student ||--o{ Report : "has"
    Student ||--o{ Curriculum : "has(planned)"
    Student ||--o{ Material : "uses(planned)"

    Report {
        int id PK
        int student_id FK
        date created_at
        text message
        text tutor_message
        text speaking_field
        text listening_field
        text grammar_field
        text vocabulary_field
        text pronunciation_field
        text highlights
        string action_item_1
        string action_item_2 "optional (blank allowed)"
        string recording_url "optional (null/blank allowed)"
        datetime updated_at
        boolean is_sent
    }

    Curriculum {
        int id PK
        int student_id FK
        text content
        date target_month
    }

    Material {
        int id PK
        int student_id FK
        string file_url
        string title
        datetime uploaded_at
    }

    Student {
        int id PK
        int user_id FK
    }
```

#### ActionPlanアプリ（アクションプラン管理）

```mermaid
erDiagram
    Student ||--o| ActionPlan : "has(planned)"
    Student ||--o{ ActionPlanHistory : "has(planned)"

    ActionPlan {
        int id PK
        int student_id FK
        string final_goal
        date final_goal_by_when
        text final_goal_action_1
        text final_goal_action_2
        text final_goal_action_3
        string fourth_goal
        date fourth_goal_by_when
        text fourth_goal_action_1
        text fourth_goal_action_2
        text fourth_goal_action_3
        string third_goal
        date third_goal_by_when
        text third_goal_action_1
        text third_goal_action_2
        text third_goal_action_3
        string second_goal
        date second_goal_by_when
        text second_goal_action_1
        text second_goal_action_2
        text second_goal_action_3
        string first_goal
        date first_goal_by_when
        text first_goal_action_1
        text first_goal_action_2
        text first_goal_action_3
        datetime updated_at
    }

    ActionPlanHistory {
        int id PK
        int student_id FK
        int action_plan_id FK
        text snapshot_json
        datetime archived_at
    }

    Student {
        int id PK
        int user_id FK
    }
```


#### Chatアプリ

```mermaid
erDiagram
    Student ||--o{ Chat : "participates"

    Chat {
        int id PK
        int student_id FK
        text message
        text vocabularies
    }

    Student {
        int id PK
        int user_id FK
    }
```

#### Reviewアプリ（レッスンノート・語彙管理）

```mermaid
erDiagram
    Student ||--o{ LessonNote : "has(planned)"
    LessonNote ||--o{ Vocabulary : "contains(planned)"

    LessonNote {
        int id PK
        int student_id FK
        date lesson_date
        text summary
        text feedback
        datetime created_at
        datetime updated_at
    }

    Vocabulary {
        int id PK
        int lesson_note_id FK
        string word
        string meaning
        string example_sentence
        datetime created_at
    }

    Student {
        int id PK
        int user_id FK
    }
```

#### DailyTaskアプリ（AI学習支援）

```mermaid
erDiagram
    Student ||--o{ DailyTask : "assigned"
    DailyTask ||--o{ ProgressLog : "tracks"
    DailyTask ||--o{ Review : "references(vocabularies)"

    DailyTask {
        int id PK
        int student_id FK
        string type
        text content
    }

    ProgressLog {
        int id PK
        int daily_task_id FK
        text submission
        text correction
        boolean is_completed
    }

    Review {
        int id PK
        int student_id FK
        int daily_task_id FK
        text vocabularies
    }

    Student {
        int id PK
        int user_id FK
    }
```

---