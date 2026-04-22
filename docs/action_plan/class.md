# ActionPlan関連クラス図（Mermaid）

```mermaid
classDiagram
    class ActionPlan {
        +student: FK(Student)
        +created_at: date
        +final_goal: string
        +final_goal_due: date
        +overall_advice: text
        +get_all_actions()
    }

    class Milestone {
        +action_plan: FK(ActionPlan)
        +label: string
        +due_date: date
        +goal_description: text
        +self_study_note: text
        +advice: choice
        +order: int
    }

    class Action {
        +action_plan: FK(ActionPlan) nullable
        +milestone: FK(Milestone) nullable
        +content: string
        +is_important: bool
    }

    class ActionPlanView {
        +get(request)
        +student user のみ許可
        +ActionPlan + Milestones + Actions を返却
    }

    class fetchActionPlan {
        +fetchActionPlan()
    }

    class AccountPage {
        +useEffect で ActionPlan 取得
        +YOUR FINAL GOAL / NEXT GOAL 表示
    }

    class Student {
        +user: OneToOne(User)
        +student_number: string
    }

    Student "1" --> "0..*" ActionPlan : action_plans
    ActionPlan "1" --> "0..*" Milestone : milestones
    ActionPlan "1" --> "0..*" Action : final_actions
    Milestone "1" --> "0..*" Action : actions

    fetchActionPlan --> ActionPlanView
    AccountPage --> fetchActionPlan
```

- Action は `action_plan` または `milestone` のどちらか一方のみを持つ（`ck_action_exactly_one_parent`）。
- Milestone の並びは `order` で管理し、同一 ActionPlan 内でユニーク（`uq_milestone_order_per_plan`）。
- Milestone.advice は choices から選択し、APIでは表示文言（`get_advice_display()`）を返す。
