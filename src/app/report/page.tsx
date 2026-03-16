"use client";
import { useState, useEffect } from "react";
import { IReport } from "@/types/IReport";
import { useUserStore } from "@/app/stores/userStore";
import { useLatestReportStore } from "@/app/stores/reportStore";
import { fetchLatestReport } from "../services/fetchLatestReport";
import { RxDoubleArrowDown } from "react-icons/rx";

// 共通Tailwindクラス
const sectionStyle =
    "bg-white px-5 py-4 shadow-sm border border-[#E4EBEC] transition hover:shadow-md";

const titleStyle = "font-semibold text-base text-[#287878]";

const contentStyle =
    "text-sm text-gray-700 whitespace-pre-line mt-3 leading-relaxed";

// タップで開閉するフィールド
function AccordionField({ label, value }: { label: string; value: string }) {
    const [open, setOpen] = useState(false);
    if (!value) return null;

    return (
        <div className={sectionStyle}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex justify-between items-center"
            >
                <span className={titleStyle}>{label}</span>
                <span
                    className={`text-[#287878] text-sm transition-transform duration-200 ${
                        open ? "rotate-45" : ""
                    }`}
                >
                    +
                </span>
            </button>

            {open && <div className={contentStyle}>{value}</div>}
        </div>
    );
}

export default function Report() {
    const { role } = useUserStore();
    const [report, setReport] = useState<IReport | null>(null);
    const {
        setGoal,
        setActionItem1,
        setActionItem2,
        setCreatedAt,
        setUpdatedAt,
        setMessage,
        setTutorMessage,
        setSpeakingField,
        setListeningField,
        setGrammarField,
        setVocabularyField,
        setPronunciationField,
        setRecordingUrl,
    } = useLatestReportStore();

    useEffect(() => {
        const getLatestReport = async () => {
            if (role === "student") {
                const data = await fetchLatestReport();
                setReport(data);
                if (data) {
                    setGoal(data.goal);
                    setActionItem1(data.action_item_1);
                    setActionItem2(data.action_item_2);
                    setCreatedAt(data.created_at);
                    setUpdatedAt(data.updated_at);
                    setMessage(data.message);
                    setTutorMessage(data.tutor_message);
                    setSpeakingField(data.speaking_field);
                    setListeningField(data.listening_field || "");
                    setGrammarField(data.grammar_field || "");
                    setVocabularyField(data.vocabulary_field || "");
                    setPronunciationField(data.pronunciation_field || "");
                    setRecordingUrl(data.recording_url || "");
                }
            }
        };

        getLatestReport();
    }, [role]);

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#29a0a06c] py-10 px-5">
            {/* 目標 */}
            <section className="relative p-6 text-center rounded-3xl bg-linear-to-br from-[#E6F7F7] to-white border border-[#BFE5E5] shadow-md mb-8">
                <div className="text-md font-semibold text-[#FF9233] mb-2 tracking-wide">
                    YOUR NEXT GOAL
                </div>

                <div className="text-md text-gray-800 leading-snug">
                    {report?.goal}
                </div>

                {/* ▼ 下に溶け込む矢印 */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md p-2">
                    <RxDoubleArrowDown
                        size={20}
                        className="text-[#287878] opacity-70"
                    />
                </div>
            </section>

            {/* アクション */}
            <section className="p-6 text-center rounded-3xl bg-linear-to-br from-[#E6F7F7] to-white border border-[#BFE5E5] shadow-md mb-4">
                <div className="text-md font-semibold mb-3 text-[#F54E4E] tracking-wide">
                    ACTIONS
                </div>

                <ul className="space-y-2 text-sm text-gray-800">
                    <li className="flex items-start gap-2">
                        <span className="text-[#F54E4E]">•</span>
                        {report?.action_item_1}
                    </li>

                    {report?.action_item_2 && (
                        <li className="flex items-start gap-2">
                            <span className="text-[#F54E4E]">•</span>
                            {report?.action_item_2}
                        </li>
                    )}
                </ul>
            </section>

            {/* メッセージ */}
            <AccordionField label="Message" value={report?.message ?? ""} />
            <AccordionField
                label="Tutor Message"
                value={report?.tutor_message ?? ""}
            />
            {/* スキル別コメント */}
            <AccordionField
                label="Speaking"
                value={report?.speaking_field ?? ""}
            />
            <AccordionField
                label="Listening"
                value={report?.listening_field ?? ""}
            />
            <AccordionField
                label="Grammar"
                value={report?.grammar_field ?? ""}
            />
            <AccordionField
                label="Vocabulary"
                value={report?.vocabulary_field ?? ""}
            />
            <AccordionField
                label="Pronunciation"
                value={report?.pronunciation_field ?? ""}
            />
            {/* レコーディング */}
            {report?.recording_url && (
                <div className={sectionStyle}>
                    <div className={titleStyle}>Recording</div>

                    <a
                        href={report?.recording_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-[#287878] text-white text-sm font-medium shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-200"
                    >
                        ▶ Check Recording
                    </a>

                    <p className="text-xs text-gray-400 mt-3">
                        Password:{" "}
                        <span className="font-medium text-gray-600">
                            123456
                        </span>
                    </p>
                </div>
            )}
            {/* 日付・送信済み */}
            <div className="text-xs text-gray-400 mt-4 flex justify-between">
                <span>作成日: {report?.created_at}</span>
            </div>
        </div>
    );
}
