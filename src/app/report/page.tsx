"use client";
import { useState } from "react";
import { Report } from "@/types/IReport";
import { useLatestReportStore } from "../stores/reportStore";


const sectionStyle =
  "border-2 border-[#E4EBEC] rounded-md bg-white px-4 py-2 mb-3";
const titleStyle = "font-semibold text-base text-[#FF9233] mb-1";
const contentStyle = "text-sm text-gray-700 whitespace-pre-line";
const buttonStyle =
  "text-xs text-blue-500 underline cursor-pointer mb-2 focus:outline-none";

function AccordionField({ label, value }: { label: string; value: string }) {
  const [open, setOpen] = useState(false);
  if (!value) return null;
  return (
    <div className={sectionStyle}>
      <div className="flex justify-between items-center">
        <span className={titleStyle}>{label}</span>
        <button className={buttonStyle} onClick={() => setOpen((v) => !v)}>
          {open ? "閉じる" : "開く"}
        </button>
      </div>
      {open && <div className={contentStyle}>{value}</div>}
    </div>
  );
}

export default function ReportAccordion() {
  const report = useLatestReportStore();


  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      {/* 目標 */}
      <section className="mb-6 p-6 rounded-xl bg-[#FFF7E6] border-2 border-[#FF9233]">
        <div className="text-lg font-bold text-[#FF9233] mb-2">今回の目標</div>
        <div className="text-2xl text-gray-900 mb-2">{report.goal}</div>
        <div className="text-xs text-gray-500 mb-1">達成度: {achievementLabel(report.achievement_level)}</div>
      </section>
      {/* アクション */}
      <section className="mb-6 p-4 rounded-xl bg-[#F9E4D1] border-2 border-[#E4EBEC]">
        <div className="text-base font-semibold mb-2 text-[#F54E4E]">そのためにやること</div>
        <ul className="list-disc ml-6">
          <li>{report.action_item_1}</li>
          {report.action_item_2 && <li>{report.action_item_2}</li>}
        </ul>
      </section>
      {/* メッセージ */}
      <AccordionField label="Message" value={report.message} />
      <AccordionField label="Tutor Message" value={report.tutor_message} />
      {/* スキル別コメント */}
      <AccordionField label="Speaking" value={report.speaking_field} />
      <AccordionField label="Listening" value={report.listening_field ?? ""} />
      <AccordionField label="Grammar" value={report.grammar_field ?? ""} />
      <AccordionField label="Vocabulary" value={report.vocabulary_field ?? ""} />
      <AccordionField label="Pronunciation" value={report.pronunciation_field ?? ""} />
      {/* レコーディングURL */}
      {report.recording_url && (
        <div className={sectionStyle}>
          <div className={titleStyle}>Recording URL</div>
          <a
            href={report.recording_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Play Recording
          </a>
        </div>
      )}
      {/* 日付・送信済み */}
      <div className="text-xs text-gray-400 mt-4 flex justify-between">
        <span>作成日: {report.created_at}</span>
      </div>
    </div>
  );
}

function achievementLabel(level: Report["achievement_level"]) {
  switch (level) {
    case "not_started":
      return "未着手";
    case "in_progress":
      return "途中";
    case "achieved":
      return "達成";
    default:
      return "";
  }
}
