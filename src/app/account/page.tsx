"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RxDoubleArrowDown } from "react-icons/rx";
import { fetchActionPlan, ActionPlan } from "@/app/services/fetchActionPlan";

type QaLog = {
    id: string;
    question: string;
    answer: string;
    status: "pending" | "archived";
    createdAt: string;
    answeredAt?: string;
};

export default function Account() {
    const dailyTasks = [
        { id: "shadowing", label: "シャドーイング" },
        { id: "ondoku", label: "音読" },
        { id: "vocabulary", label: "ボキャブラリー" },
        { id: "eikaiwa", label: "瞬間英作文" },
        { id: "ai", label: "AI英会話" },
    ] as const;

    const router = useRouter();
    const [isActionPlanOpen, setIsActionPlanOpen] = useState(false);
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(
        new Set(),
    );
    const [questionText, setQuestionText] = useState("");
    const [qaLogs, setQaLogs] = useState<QaLog[]>([]);
    const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);

    useEffect(() => {
        fetchActionPlan().then(setActionPlan);
    }, []);

    const handleTaskCheck = (taskId: string, checked: boolean) => {
        if (checked) {
            setTimeout(() => {
                setCompletedTasks((prev) => new Set(prev).add(taskId));
            }, 100);
        } else {
            setCompletedTasks((prev) => {
                const next = new Set(prev);
                next.delete(taskId);
                return next;
            });
        }
    };

    const handleSubmitQuestion = () => {
        const question = questionText.trim();
        if (!question) return;

        setQaLogs((prev) => [
            {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                question,
                answer: "",
                status: "pending",
                createdAt: new Date().toISOString(),
            },
            ...prev,
        ]);
        setQuestionText("");
    };

    const completedCount = completedTasks.size;
    const weeklyAchievementRate = Math.round(
        (completedCount / dailyTasks.length) * 100,
    );

    // ***** ここからActionPlan関連のロジック *****
    // 次のマイルストーンを計算
    const toDate = (value: string) => {
        const d = new Date(value);
        d.setHours(0, 0, 0, 0);
        return d;
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const milestonesByDueDate = [...(actionPlan?.milestones ?? [])].sort(
        (a, b) => toDate(a.due_date).getTime() - toDate(b.due_date).getTime(),
    );

    const nextMilestone =
        milestonesByDueDate.find(
            (m) => toDate(m.due_date).getTime() >= today.getTime(),
        ) ??
        milestonesByDueDate[milestonesByDueDate.length - 1] ??
        null;

    // 重要マーク
    const mark = (
        <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border border-red-300 text-red-600 text-[10px] font-bold leading-none">
            ★
        </span>
    );

    // ***** ここまでActionPlan関連のロジック *****

    return (
        <div className="h-dvh flex flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto pt-15 md:pt-30 pb-24 bg-[#29a0a06c]">
                <div className="w-full max-w-2xl mx-auto py-12 px-6 space-y-10">
                    {/* ActionPlanCard */}
                    <section className="relative p-8 rounded-2xl bg-amber-100 border border-gray-200 shadow-sm">
                        <p className="text-md text-center tracking-[0.2em] text-[#F54E4E] mb-4">
                            YOUR FINAL GOAL
                        </p>
                        <p className="text-xs text-center tracking-[0.2em] mb-4">
                            {actionPlan
                                ? `By ${actionPlan.final_goal_due}`
                                : "—"}
                        </p>

                        <p className="text-sm text-center bg-(--background) p-4 rounded-2xl text-gray-900 leading-relaxed mb-6">
                            {actionPlan?.final_goal ?? ""}
                        </p>

                        {actionPlan && actionPlan.final_actions.length > 0 && (
                            <>
                                <p className="mt-4 pt-3 border-t border-amber-200 text-xs text-center tracking-[0.2em] text-[#FF9233] mb-4">
                                    ACTIONS
                                </p>
                                <ul className="space-y-2 text-xs text-gray-700 mb-6 text-left">
                                    {actionPlan.final_actions.map(
                                        (action, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-2 leading-relaxed bg-white/70 rounded-lg px-3 py-2 border border-amber-200"
                                            >
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    {i + 1}
                                                </span>
                                                <span>{action.content}</span>
                                                {action.is_important && mark}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </>
                        )}

                        <div className="flex justify-center">
                            <button
                                onClick={() =>
                                    setIsActionPlanOpen((prev) => !prev)
                                }
                                className="px-6 py-2 rounded-full bg-[#FF9233] text-white text-sm hover:opacity-90 transition"
                            >
                                {isActionPlanOpen
                                    ? "アクションプランを閉じる"
                                    : "アクションプランを見る"}
                            </button>
                        </div>

                        {/* Milestones */}
                        <div
                            className={`grid transition-all duration-300 ease-out ${
                                isActionPlanOpen
                                    ? "grid-rows-[1fr] opacity-100 mt-5"
                                    : "grid-rows-[0fr] opacity-0 mt-0"
                            }`}
                        >
                            <div className="overflow-hidden">
                                <div className="space-y-4 text-left text-sm text-gray-700">
                                    {actionPlan?.milestones.map(
                                        (milestone, i) => (
                                            <article
                                                key={i}
                                                className="rounded-2xl bg-white/90 border border-amber-200 px-4 py-6"
                                            >
                                                <p className="text-xs text-[#F54E4E] font-semibold">
                                                    {milestone.label} / By{" "}
                                                    {milestone.due_date}
                                                </p>
                                                <p className="mt-2 font-medium">
                                                    {milestone.goal_description}
                                                </p>
                                                {milestone.actions.length >
                                                    0 && (
                                                    <>
                                                        <p className="mt-4 pt-3 border-t border-amber-200 text-xs font-semibold text-[#FF9233]">
                                                            そのために...
                                                        </p>
                                                        <ul className="mt-2 space-y-2 text-xs">
                                                            {milestone.actions.map(
                                                                (action, j) => (
                                                                    <li
                                                                        key={j}
                                                                        className="flex items-start gap-2 leading-relaxed"
                                                                    >
                                                                        <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold"> {j + 1}</span>
                                                                        <span>{action.content}</span>
                                                                        {action.is_important && mark}
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </>
                                                )}
                                                {milestone.self_study_note && (
                                                    <div className="mt-5 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                                                        <span className="font-semibold tracking-wide">
                                                            自己学習
                                                        </span>
                                                        <br />
                                                        {milestone.self_study_note}
                                                    </div>
                                                )}
                                                {milestone.advice && (
                                                    <p className="mt-2 pl-3 border-l-2 border-amber-300 text-xs italic text-gray-500">
                                                        {milestone.advice}
                                                    </p>
                                                )}
                                            </article>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md p-2">
                            <RxDoubleArrowDown
                                size={20}
                                className="text-[#287878] opacity-70 animate-bounce"
                            />
                        </div>
                    </section>

                    {/* GoalCard */}
                    <section className="relative p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <p className="text-md text-center tracking-[0.2em] text-[#F54E4E] mb-4">
                            YOUR NEXT GOAL
                        </p>
                        <p className="text-xs text-center tracking-[0.2em] mb-4">
                            {nextMilestone
                                ? `By ${nextMilestone.due_date}`
                                : "—"}
                        </p>

                        <p className="text-sm tracking-[0.2em] text-center p-4 text-gray-900 leading-relaxed mb-4 bg-[#F7FBFB] rounded-lg px-3 py-4">
                            {nextMilestone?.goal_description ?? ""}
                        </p>

                        {nextMilestone && nextMilestone.actions.length > 0 && (
                            <>
                                <p className="mt-4 pt-3 border-t border-[#DDF3F3] text-xs text-center tracking-[0.2em] text-[#FF9233] mb-4">
                                    ACTIONS
                                </p>

                                <ul className="space-y-2 text-xs tracking-[0.2em] text-gray-700 mb-6 text-left">
                                    {nextMilestone.actions.map((action, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 leading-relaxed bg-[#F7FBFB] rounded-lg px-3 py-2 border border-[#D7ECEC]"
                                        >
                                            <span className="mt-0.5 px-1.5 py-0.5 rounded bg-[#DDF3F3] text-[#287878] font-semibold text-xs">
                                                {i + 1}
                                            </span>
                                            <span>{action.content}</span>
                                            {action.is_important && mark}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md p-2">
                            <RxDoubleArrowDown
                                size={20}
                                className="text-[#287878] opacity-70 animate-bounce"
                            />
                        </div>
                    </section>

                    {/* NextLessonCard */}
                    <section className="relative flex flex-col gap-2 p-7 rounded-2xl bg-(--background) border border-gray-200 shadow-sm text-center">
                        <p className="text-xs tracking-[0.25em] text-gray-400 mb-4">
                            NEXT LESSON
                        </p>

                        {/* Date */}
                        <p className="text-3xl font-semibold text-gray-900">
                            1 / 31
                        </p>

                        <p className="text-sm text-gray-500 mt-2 mb-4">
                            13:00 – 14:00
                        </p>

                        {/* Meet Link */}
                        <div className="flex justify-center mb-4">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        "https://meet.google.com/xxxx",
                                    );
                                    alert("Link copied!");
                                }}
                                className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition"
                            >
                                🔗 Zoom link
                                <span className="text-xs text-gray-400">
                                    (copy)
                                </span>
                            </button>
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-center gap-4 mb-6">
                            <button className="px-6 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition">
                                キャンセル
                            </button>

                            <button className="px-6 py-2 rounded-full bg-[#287878] text-white text-sm hover:opacity-90 transition">
                                変更
                            </button>
                        </div>

                        {/* Remaining */}
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-xs text-gray-400">
                                残りレッスン
                            </p>
                            <p className="text-2xl font-semibold text-gray-900 mt-1">
                                1
                                <span className="text-base ml-1 text-gray-500">
                                    回
                                </span>
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => router.push("/report")}
                                    className="px-6 py-2 mt-4 rounded-full bg-[#287878] text-white text-sm hover:opacity-90 transition"
                                >
                                    前回のレポートを見る
                                </button>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md p-2">
                            <RxDoubleArrowDown
                                size={20}
                                className="text-[#287878] opacity-70 animate-bounce"
                            />
                        </div>
                    </section>

                    {/* DailyTaskCard */}
                    <section className="flex flex-col gap-2 p-8 rounded-2xl bg-(--background) border border-gray-200 shadow-sm text-center">
                        <p className="text-xs text-center tracking-[0.2em] text-gray-400 mb-4">
                            DAILY TASK
                        </p>

                        <div className="mb-4 rounded-xl bg-[#F7FBFB] border border-[#D7ECEC] px-4 py-3 text-left">
                            <p className="text-[11px] tracking-[0.15em] text-[#287878] mb-2">
                                今日の達成率
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                <span>
                                    {completedCount} / {dailyTasks.length} 完了
                                </span>
                                <span className="font-semibold text-[#287878]">
                                    {weeklyAchievementRate}%
                                </span>
                            </div>
                            <div className="h-2 rounded-full bg-[#DDF3F3] overflow-hidden">
                                {/* 達成率バー */}
                                <div
                                    className="h-full bg-[#287878] transition-all duration-300"
                                    style={{ width: `${weeklyAchievementRate}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {dailyTasks.map(({ id, label }) => {
                                const done = completedTasks.has(id);
                                return (
                                    <div
                                        key={id}
                                        className="flex justify-between items-center"
                                    >
                                        <span
                                            className={`text-sm transition ${done ? "text-gray-400 line-through" : "text-gray-700"}`}
                                        >
                                            {label}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                disabled={done}
                                                className={`px-4 py-1.5 rounded-full border text-xs transition ${
                                                    done
                                                        ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                                                        : "bg-[#FF9233] text-white hover:bg-[#FF9233]/90"
                                                }`}
                                            >
                                                Try
                                            </button>
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded accent-[#FF9233] cursor-pointer"
                                                onChange={(e) =>
                                                    handleTaskCheck(
                                                        id,
                                                        e.target.checked,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200 text-left">
                            <p className="text-xs tracking-[0.15em] text-gray-500 mb-3">
                                Comments
                            </p>
                            <textarea
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                placeholder="質問やコメントを入力"
                                rows={2}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#287878]/30"
                            />
                            <div className="flex justify-end mt-3">
                                <button
                                    type="button"
                                    onClick={handleSubmitQuestion}
                                    className="px-4 py-2 rounded-full bg-[#287878] text-white text-xs hover:opacity-90 transition"
                                >
                                    Send
                                </button>
                            </div>

                            {qaLogs.length > 0 && (
                                <ul className="mt-4 space-y-2">
                                    {qaLogs.map((item, index) => (
                                        <li
                                            key={item.id ?? `${item.question}-${index}`}
                                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs"
                                        >
                                            <p className="text-gray-800">
                                                生徒: {item.question}
                                            </p>
                                            <p className="text-gray-500 mt-1">
                                                先生: {item.answer || "回答待ち"}
                                            </p>
                                            {item.status === "archived" && (
                                                <p className="text-[10px] text-[#287878] mt-1">
                                                    trajectory に蓄積済み
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                </div>
            </main>
            {/* フッター */}
            <Footer />
        </div>
    );
}
