
export type Report = {
    student: string;
    report_number: number;
    created_at: string;
    message: string;
    tutor_message: string;
    speaking_field: string;
    listening_field: string;
    grammar_field: string;
    vocabulary_field: string;
    pronunciation_field: string;
    goal: string;
    achievement_level: 'not_started' | 'in_progress' | 'achieved';
    action_item_1: string;
    action_item_2: string;
    recording_url: string | null;
    updated_at: string;
    is_sent: boolean;
}

