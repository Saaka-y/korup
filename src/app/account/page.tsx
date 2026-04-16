"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RxDoubleArrowDown } from "react-icons/rx";

export default function Account() {
    const router = useRouter();
    const [isActionPlanOpen, setIsActionPlanOpen] = useState(false);
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(
        new Set(),
    );

    const handleTaskCheck = (taskId: string, checked: boolean) => {
        if (checked) {
            setTimeout(() => {
                setCompletedTasks((prev) => new Set(prev).add(taskId));
            }, 800);
        } else {
            setCompletedTasks((prev) => {
                const next = new Set(prev);
                next.delete(taskId);
                return next;
            });
        }
    };

    const mark = (
        <span className="mt-0.5 px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-semibold">
            重要
        </span>
    );

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
                        <p className="text-xs text-center tracking-[0.2em]  mb-4">
                            By 20 Mar 2026
                        </p>

                        <p className="text-sm text-center bg-(--background) p-4 rounded-2xl text-gray-900 leading-relaxed mb-6  ">
                            海外旅行で、現地の人と1回につき4文以上のキャッチボールをして、1時間会話を自分主体で広げられる
                        </p>

                        <p className="mt-4 pt-3 border-t border-amber-200 text-xs text-center tracking-[0.2em] text-[#FF9233] mb-4">
                            ACTIONS
                        </p>
                        <ul className="space-y-2 text-xs text-gray-700 mb-6 text-left">
                            <li className="flex items-start gap-2 leading-relaxed bg-white/70 rounded-lg px-3 py-2 border border-amber-200">
                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                    1
                                </span>
                                <span>
                                    シャドーイングで英語のテンポに頭と口を慣らす
                                </span>
                                {mark}
                            </li>
                            <li className="flex items-start gap-2 leading-relaxed bg-white/70 rounded-lg px-3 py-2 border border-amber-200">
                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                    2
                                </span>
                                <span>
                                    ネイティブ同士の会話を観て大量のインプットを促す
                                </span>
                            </li>
                            <li className="flex items-start gap-2 leading-relaxed bg-white/70 rounded-lg px-3 py-2 border border-amber-200">
                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                    3
                                </span>
                                <span>
                                    英語文化圏に浸かって話をした経験が10回以上ある
                                </span>
                                {mark}
                            </li>
                        </ul>

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

                        <div
                            className={`grid transition-all duration-300 ease-out ${
                                isActionPlanOpen
                                    ? "grid-rows-[1fr] opacity-100 mt-5"
                                    : "grid-rows-[0fr] opacity-0 mt-0"
                            }`}
                        >
                            <div className="overflow-hidden">
                                <div className="space-y-4 text-left text-sm text-gray-700">
                                    <article className="rounded-2xl bg-white/90 border border-amber-200 p-4">
                                        <p className="text-xs text-[#F54E4E] font-semibold">
                                            半年後 / By Sep 20 2026
                                        </p>
                                        <p className="mt-2 font-medium">
                                            自分の意見を常に考える癖がつき、英語の自然な流れでキャッチボールができる
                                        </p>
                                        <p className="mt-4 pt-3 border-t border-amber-200 text-xs font-semibold text-[#FF9233]">
                                            そのために...
                                        </p>
                                        <ul className="mt-2 space-y-2 text-xs">
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    1
                                                </span>
                                                <span>
                                                    英会話での相槌、返しをネイティブに寄せて真似をする
                                                </span>
                                                {mark}
                                            </li>
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    2
                                                </span>
                                                <span>
                                                    ジェネラルトピックに対して、OREOのセットで考える癖をつける
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    3
                                                </span>
                                                <span>
                                                    わからない単語を説明できるようになる
                                                </span>
                                                {mark}
                                            </li>
                                        </ul>
                                        <p className="mt-3 text-xs">
                                            自己学習:
                                            シャドーイング、音読、単語帳（Ultimate
                                            Expressions含む）
                                        </p>
                                        <p className="mt-2 text-xs text-gray-600">
                                            会話のキャッチボールは「感情」を乗せることが鍵。台本を読んでいるようにならないことを意識する。
                                        </p>
                                    </article>

                                    <article className="rounded-2xl bg-white/90 border border-amber-200 p-4">
                                        <p className="text-xs text-[#F54E4E] font-semibold">
                                            3ヶ月後 / By June 20 2026
                                        </p>
                                        <p className="mt-2 font-medium">
                                            慣れているトピックで細かい気持ちのニュアンスを表現できる
                                        </p>
                                        <p className="mt-4 pt-3 border-t border-amber-200 text-xs font-semibold text-[#FF9233]">
                                            そのために...
                                        </p>
                                        <ul className="mt-2 space-y-2 text-xs">
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    1
                                                </span>
                                                <span>
                                                    助動詞の使い方を学び、応用できるようにする
                                                </span>
                                                {mark}
                                            </li>
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    2
                                                </span>
                                                <span>
                                                    様々な副詞を覚えて、積極的に使っていく
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    3
                                                </span>
                                                <span>
                                                    相手に合わせて質問やお願いの仕方を自分で選べるようにする
                                                </span>
                                                {mark}
                                            </li>
                                        </ul>
                                        <p className="mt-3 text-xs">
                                            自己学習:
                                            シャドーイング、音読、単語帳（Ultimate
                                            Expressions含む）
                                        </p>
                                        <p className="mt-2 text-xs text-gray-600">
                                            細かいニュアンスはリアルな英語に触れることが大切。常に英語環境へ自分をexposeする。
                                        </p>
                                    </article>

                                    <article className="rounded-2xl bg-white/90 border border-amber-200 p-4">
                                        <p className="text-xs text-[#F54E4E] font-semibold">
                                            2ヶ月後 / By May 20 2026
                                        </p>
                                        <p className="mt-2 font-medium">
                                            簡単な単語で作った文章を、接続詞でつないで言える
                                        </p>
                                        <p className="mt-4 pt-3 border-t border-amber-200 text-xs font-semibold text-[#FF9233]">
                                            そのために...
                                        </p>
                                        <ul className="mt-2 space-y-2 text-xs">
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    1
                                                </span>
                                                <span>
                                                    接続詞をマスターする
                                                </span>
                                                {mark}
                                            </li>
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    2
                                                </span>
                                                <span>
                                                    人以外が主語になる時の文の作り方を判断できるようにする
                                                </span>
                                                {mark}
                                            </li>
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    3
                                                </span>
                                                <span>
                                                    関係代名詞を使って後ろから名詞を修飾できるようにする
                                                </span>
                                            </li>
                                        </ul>
                                        <p className="mt-3 text-xs">
                                            自己学習:
                                            シャドーイング、音読、ボキャブラリー（Ultimate
                                            Expressions）
                                        </p>
                                        <p className="mt-2 text-xs text-gray-600">
                                            流れるような英語はシャドーイングが鍵。毎日やる時間を決めて継続する。
                                        </p>
                                    </article>

                                    <article className="rounded-2xl bg-white/90 border border-amber-200 p-4">
                                        <p className="text-xs text-[#F54E4E] font-semibold">
                                            1ヶ月後 / By Apr 20 2026
                                        </p>
                                        <p className="mt-2 font-medium">
                                            辞書を使わず、基本的な日本語の文章を英語のイントネーションで1文にできる
                                        </p>
                                        <p className="mt-4 pt-3 border-t border-amber-200 text-xs font-semibold text-[#FF9233]">
                                            そのために...
                                        </p>
                                        <ul className="mt-2 space-y-2 text-xs">
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    1
                                                </span>
                                                <span>
                                                    初歩文法を見直す（可算名詞・品詞・時制を含む）
                                                </span>
                                                {mark}
                                            </li>
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    2
                                                </span>
                                                <span>
                                                    基本語彙を底上げする（目安3000語）
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2 leading-relaxed">
                                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">
                                                    3
                                                </span>
                                                <span>
                                                    英語イントネーションを自然に真似できるようにする
                                                </span>
                                                {mark}
                                            </li>
                                        </ul>
                                        <p className="mt-3 text-xs">
                                            自己学習:
                                            シャドーイング、音読、ボキャブラリー（キー動詞、主語の種類理解）
                                        </p>
                                        <p className="mt-2 text-xs text-gray-600">
                                            最初は習慣化が難しい。ここで踏ん張って後の自分を楽にする。
                                        </p>
                                    </article>
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
                        <p className="text-xs text-center tracking-[0.2em]  mb-4">
                            By 20 Apr 2026
                        </p>

                        <p className="text-sm tracking-[0.2em] text-center p-4  text-gray-900 leading-relaxed mb-4 bg-[#F7FBFB] rounded-lg px-3 py-4 ">
                            辞書を使わず、基本的な日本語の文章を英語のイントネーションで1文にできる
                        </p>

                        <p className="mt-4 pt-3 border-t border-[#DDF3F3] text-xs text-center tracking-[0.2em] text-[#FF9233] mb-4">
                            ACTIONS
                        </p>

                        <ul className="space-y-2 text-xs tracking-[0.2em] text-gray-700 mb-6 text-left">
                            <li className="flex items-start gap-2 leading-relaxed bg-[#F7FBFB] rounded-lg px-3 py-2 border border-[#D7ECEC]">
                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-[#DDF3F3] text-[#287878] font-semibold text-xs">
                                    1
                                </span>
                                <span>
                                    初歩文法を見直す（可算名詞・品詞・時制を含む）
                                </span>
                                {mark}
                            </li>

                            <li className="flex items-start gap-2 leading-relaxed bg-[#F7FBFB] rounded-lg px-3 py-2 border border-[#D7ECEC]">
                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-[#DDF3F3] text-[#287878] font-semibold text-xs">
                                    2
                                </span>
                                <span>基本語彙を底上げする（目安3000語）</span>
                            </li>
                            <li className="flex items-start gap-2 leading-relaxed bg-[#F7FBFB] rounded-lg px-3 py-2 border border-[#D7ECEC]">
                                <span className="mt-0.5 px-1.5 py-0.5 rounded bg-[#DDF3F3] text-[#287878] font-semibold text-xs">
                                    3
                                </span>
                                <span>
                                    英語イントネーションを自然に真似できるようにする
                                </span>
                                {mark}
                            </li>
                        </ul>

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
                                🔗 Google Meet link
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

                        <div className="space-y-4">
                            {(
                                [
                                    {
                                        id: "shadowing",
                                        label: "シャドーイング",
                                    },
                                    { id: "ondoku", label: "音読" },
                                    {
                                        id: "vocabulary",
                                        label: "ボキャブラリー",
                                    },
                                    { id: "eikaiwa", label: "瞬間英作文" },
                                    { id: "ai", label: "AI英会話" },
                                ] as const
                            ).map(({ id, label }) => {
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
                    </section>
                </div>
            </main>
            {/* フッター */}
            <Footer />
        </div>
    );
}
