import { apiFetch } from "@/app/services/api-client";

export type ActionItem = {
    content: string;
    is_important: boolean;
};

export type Milestone = {
    label: string;
    due_date: string;
    goal_description: string;
    self_study_note: string;
    advice: string;
    actions: ActionItem[];
};

export type ActionPlan = {
    final_goal: string;
    final_goal_due: string;
    overall_advice: string;
    final_actions: ActionItem[];
    milestones: Milestone[];
};

export async function fetchActionPlan(): Promise<ActionPlan | null> {
    try {
        const res = await apiFetch("/api/action_plan/", { method: "GET" });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching action plan:", error);
        return null;
    }
}
