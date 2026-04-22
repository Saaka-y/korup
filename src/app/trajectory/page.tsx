"use client";

import { useMemo, useState } from "react";

type QaLog = {
  id: string;
  question: string;
  answer: string;
  status: "pending" | "archived";
  createdAt: string;
  answeredAt?: string;
};

export default function ReviewPage() {
  const [qaLogs, setQaLogs] = useState<QaLog[]>([]);
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});

  const pendingLogs = useMemo(
    () => qaLogs.filter((item) => item.status === "pending"),
    [qaLogs],
  );

  const archivedLogs = useMemo(
    () => qaLogs.filter((item) => item.status === "archived"),
    [qaLogs],
  );

  const handleArchiveWithAnswer = (id: string) => {
    const answer = (draftAnswers[id] ?? "").trim();
    if (!answer) return;

    setQaLogs((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              answer,
              status: "archived",
              answeredAt: new Date().toISOString(),
            }
          : item,
      ),
    );

    setDraftAnswers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return (
    <main className="p-4 md:p-8 space-y-8 bg-[#F7FBFB] min-h-screen">
      <h1 className="text-2xl font-bold">軌跡（Q&A）</h1>

      <section className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
        <h2 className="text-sm font-semibold text-[#287878] mb-4">回答待ち</h2>
        {pendingLogs.length === 0 ? (
          <p className="text-sm text-gray-500">現在、回答待ちの質問はありません。</p>
        ) : (
          <ul className="space-y-4">
            {pendingLogs.map((item) => (
              <li key={item.id} className="rounded-lg border border-gray-200 p-3 bg-[#FCFEFE]">
                <p className="text-xs text-gray-500">生徒からの質問</p>
                <p className="text-sm text-gray-900 mt-1">{item.question}</p>

                <textarea
                  value={draftAnswers[item.id] ?? ""}
                  onChange={(e) =>
                    setDraftAnswers((prev) => ({ ...prev, [item.id]: e.target.value }))
                  }
                  placeholder="回答を入力"
                  rows={3}
                  className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#287878]/30"
                />

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleArchiveWithAnswer(item.id)}
                    className="px-4 py-2 rounded-full bg-[#287878] text-white text-xs hover:opacity-90 transition"
                  >
                    OK（trajectoryに蓄積）
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
        <h2 className="text-sm font-semibold text-[#287878] mb-4">蓄積済みQ&A</h2>
        {archivedLogs.length === 0 ? (
          <p className="text-sm text-gray-500">まだ蓄積されたQ&Aはありません。</p>
        ) : (
          <ul className="space-y-3">
            {archivedLogs.map((item) => (
              <li key={item.id} className="rounded-lg border border-gray-200 p-3 bg-white">
                <p className="text-sm text-gray-900">Q: {item.question}</p>
                <p className="text-sm text-gray-700 mt-1">A: {item.answer}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
