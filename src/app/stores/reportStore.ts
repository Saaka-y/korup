import { create } from "zustand";

type LatestReportStore = {
    goal: string;
    action_item_1: string;
    action_item_2: string;
    created_at: string;
    updated_at: string;
    message: string;
    tutor_message: string;
    speaking_field: string;
    listening_field?: string | null;
    grammar_field?: string | null;
    vocabulary_field?: string | null;
    pronunciation_field?: string | null;
    recording_url?: string | null;

    setGoal: (goal: string) => void;
    setActionItem1: (action_item_1: string) => void;
    setActionItem2: (action_item_2: string) => void;
    setCreatedAt: (created_at: string) => void;
    setUpdatedAt: (updated_at: string) => void;
    setMessage: (message: string) => void;
    setTutorMessage: (tutor_message: string) => void;
    setSpeakingField: (speaking_field: string) => void;
    setListeningField: (listening_field: string) => void;
    setGrammarField: (grammar_field: string) => void;
    setVocabularyField: (vocabulary_field: string) => void;
    setPronunciationField: (pronunciation_field: string) => void;
    setRecordingUrl: (recording_url: string) => void;
};

export const useLatestReportStore = create<LatestReportStore>()((set) => ({
    goal: "",
    action_item_1: "",
    action_item_2: "",
    created_at: "",
    updated_at: "",
    message: "",
    tutor_message: "",
    speaking_field: "",
    listening_field: "",
    grammar_field: "",
    vocabulary_field: "",
    pronunciation_field: "",
    recording_url: "",

    setGoal: (goal: string) => set({ goal }),
    setActionItem1: (action_item_1: string) => set({ action_item_1 }),
    setActionItem2: (action_item_2: string) => set({ action_item_2 }),
    setCreatedAt: (created_at: string) => set({ created_at }),
    setUpdatedAt: (updated_at: string) => set({ updated_at }),
    setMessage: (message: string) => set({ message }),
    setTutorMessage: (tutor_message: string) => set({ tutor_message }),
    setSpeakingField: (speaking_field: string) =>
        set({ speaking_field }),
    setListeningField: (listening_field: string) =>
        set({ listening_field }),
    setGrammarField: (grammar_field: string) => set({ grammar_field }),
    setVocabularyField: (vocabulary_field: string) =>
        set({ vocabulary_field }),
    setPronunciationField: (pronunciation_field: string) =>
        set({ pronunciation_field }),
    setRecordingUrl: (recording_url: string) =>
        set({ recording_url }),

}));
