"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUserInfo } from "@/types/IUser";
import { IGoalAndActions } from "@/types/IReport";
import { useUserStore } from "../stores/userStore";
import { fetchGoalAndActions } from "@/app/services/fetchGoalAndActions";
import { fetchUserInfo } from "@/app/services/fetchUserInfo";
import { RxDoubleArrowDown } from "react-icons/rx";

export default function Account() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
    const [goalAndActions, setGoalAndActions] =
        useState<IGoalAndActions | null>(null);

    const { loggedIn,  setStudentNumber, setTutorNumber, setRole, setEmail } =
        useUserStore();

    useEffect(() => {
        const getUser = async () => {
            const data = await fetchUserInfo({
                loggedIn: loggedIn,
                setStudentNumber,
                setTutorNumber,
                setRole,
                setEmail,
            });
            setUserInfo(data);
        };
        getUser();
    }, [loggedIn, setStudentNumber, setTutorNumber, setRole, setEmail]);

    useEffect(() => {
        const getGoalAndActions = async () => {
            if (userInfo && userInfo.role === "student") {
                const data = await fetchGoalAndActions();
                setGoalAndActions(data);
            }
        };

        getGoalAndActions();
    }, [userInfo]);

    return (
        <div className="h-dvh flex flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto pt-15 md:pt-30 pb-24 bg-[#29a0a06c]">
                <div className="w-full max-w-2xl mx-auto py-12 px-6 space-y-10">

                    {/* NextLessonCard */}
                    <section className=" flex flex-col gap-2 p-7 rounded-2xl bg-(--background) border border-gray-200 shadow-sm text-center">
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
                        </div>
                        
                    </section>


                    {/* GoalCard */}
                    <section className="relative p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <p className="text-xs text-center tracking-[0.2em] text-[#FF9233] mb-4">
                            YOUR NEXT GOAL
                        </p>

                        <p className="text-sm text-center text-gray-900 leading-relaxed mb-6">
                            {goalAndActions
                                ? goalAndActions.goal
                                : "目標が設定されていません"}
                        </p>

                        {goalAndActions && (
                            <>
                             <p className="text-xs text-center tracking-[0.2em] text-[#F54E4E] mb-4">
                            ACTIONS
                        </p>
                            <ul className="space-y-3 text-sm text-gray-700 mb-6">
                                <li>• {goalAndActions.action_item_1}</li>
                                {goalAndActions.action_item_2 && (
                                    <li>• {goalAndActions.action_item_2}</li>
                                )}
                            </ul>
                            </>
                        )}

                        <div className="flex justify-center">
                            <button
                                onClick={() => router.push("/report")}
                                className="px-6 py-2 rounded-full bg-[#287878] text-white text-sm hover:opacity-90 transition"
                            >
                                前回のレポートを見る
                            </button>
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

                        <div className="mb-6">
                            <p className="text-sm font-semibold text-gray-900">
                                You have tasks for today!
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Jan 27, Tue
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">
                                    シャドーイング
                                </span>
                                <button className="px-4 py-1.5 rounded-full border bg-[#287878]  text-xs  text-white hover:bg-[#287878]/90 transition">
                                    Try
                                </button>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">
                                    表現力アップ
                                </span>
                                <button className="px-4 py-1.5 rounded-full border bg-[#287878]  text-xs  text-white hover:bg-[#287878]/90 transition">
                                    Try
                                </button>
                            </div>
                        </div>
                        
                    </section>

                    
                </div>
            </main>
            {/* フッター */}
            <Footer />
        </div>
    );
}
