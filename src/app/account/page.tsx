"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import NextLessonCard from "@/app/components/NextLessonCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUserInfo } from "@/types/IUser";
import { IGoalAndActions } from "@/types/IReport";
import { useUserStore } from "../stores/userStore";
import { fetchGoalAndActions } from "@/app/services/fetchGoalAndActions";
import { fetchUserInfo } from "@/app/services/fetchUserInfo";

// 共通Tailwindクラス
const tryButton = "bg-[#F54E4E] px-8 py-1 rounded-full text-white";
const grayBox = "border-2 border-[#E4EBEC] rounded-md";

export default function Account() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
    const [goalAndActions, setGoalAndActions] = useState<IGoalAndActions | null>(null);

    const { loggedIn, setId, setStudentId, setTutorId, setRole, setEmail } =
        useUserStore();

    useEffect(() => {
        const getUser = async () => {
            const data = await fetchUserInfo({
                loggedIn: loggedIn,
                setId,
                setStudentId,
                setTutorId,
                setRole,
                setEmail,
            });
            setUserInfo(data);
        };
        getUser();
    }, [loggedIn, setId, setStudentId, setTutorId, setRole, setEmail]);


    useEffect(() => {
        const getGoalAndActions = async () => {
            if (userInfo && userInfo.student_id !== undefined) {
                const data = await fetchGoalAndActions({
                    id: userInfo.student_id,
                });
                setGoalAndActions(data);  
            }
        };

        getGoalAndActions();
    }, [userInfo]);

    
    return (
        <div className="h-dvh overflow-hidden relative py-15 md:py-30">
            <Header />
            <main className="h-full flex flex-col justify-center items-center gap-4">
                <NextLessonCard grayBox={grayBox} />
                {/* DailyTaskCard */}
                <section
                    id="daily-task-card"
                    className={`card w-full gap-4 bg-[#F9E4D1]`}
                >
                    <p className="text-xl">5 mins challenge!</p>
                    <p className="text-[#F54E4E]">Jan 27, Tue</p>
                    {/* 課題に進むボタン */}
                    <div className="flex flex-row justify-center gap-5">
                        <div
                            className={`flex flex-col justify-center items-center gap-2 bg-(--color-background) px-6 py-4 rounded-md shadow-xl/20`}
                        >
                            <p className="text-xs">シャドーイング</p>
                            <button className={tryButton}>Try</button>
                        </div>
                        <div
                            className={`flex flex-col justify-center items-center gap-2 bg-(--color-background) px-6 py-4 rounded-md shadow-xl/20`}
                        >
                            <p className="text-xs">表現力アップ</p>
                            <button className={tryButton}>Try</button>
                        </div>
                    </div>
                </section>

                {/* GoalCard */}
                <section
                    id="goal-card"
                    className={`card w-[90%] mb-6 gap-2 bg-[#FFFCFC] rounded-xl`}
                >
                    <p className="text-xs">
                        {userInfo
                            ? `${userInfo.username}さんの今回の目標`
                            : "Userさんの今回の目標"}
                    </p>
                    <p className="text-white bg-[#FF9233] rounded-md px-2 py-1">
                        {goalAndActions ? goalAndActions.goal : "目標が設定されていません"}
                    </p>
                    {goalAndActions ? (
                        <>
                            <p className="text-sm text-[#e0802c] ">
                                1. {goalAndActions.action_item_1}{" "}
                            </p>
                            <p className="text-sm text-[#FF9233] ">
                                2. {goalAndActions.action_item_2}{" "}
                            </p>
                        </>
                    ) : null}
                    <button
                        type="button"
                        onClick={() => router.push("/report")}
                        className={`bg-(--color-background) ${grayBox} px-6 py-1`}
                    >
                        前回のレポート
                    </button>
                </section>
            </main>
            {/* フッター */}
            <Footer />
        </div>
    );
}
