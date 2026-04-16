
export type IReport = {
    highlights: string;
    action_item_1: string;
    action_item_2: string;
    created_at: string;
    message: string;
    tutor_message: string;
    speaking_field?: string | null;
    listening_field?: string | null;
    grammar_field?: string | null;
    vocabulary_field?: string | null;
    pronunciation_field?: string | null;
    recording_url?: string | null;
}


