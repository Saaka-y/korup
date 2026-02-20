"use client";
import Header from "@/app/components/Header";
import NextLessonCard from "@/app/components/NextLessonCard";
import Footer from "@/app/components/Footer";
import { UserInfo } from "@/types/IUser";
import { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { fetchUserInfo } from "@/app/services/fetchUserInfo";
import { fetchLatestReport } from "@/app/services/fetchLatestReport";
import { Report } from "@/types/IReport";

// 共通Tailwindクラス
const tryButton = "bg-[#F54E4E] px-8 py-1 rounded-full text-white";
const grayBox = "border-2 border-[#E4EBEC] rounded-md";

export default function Account() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [report, setReport] = useState<Report | null>(null);
    const { loggedIn } = useUserStore();

    useEffect(() => {
        const getUser = async () => {
            const data = await fetchUserInfo({ loggedIn: loggedIn });
            setUserInfo(data);
        };
        getUser();
    }, [loggedIn]);

    useEffect(() => {
        const getLatestReport = async () => {
            if (userInfo) {
                const data = await fetchLatestReport({
                    id: userInfo.student_id,
                });
                setReport(data);
            }
        };
        getLatestReport();
    }, [userInfo]);

    return (
        <div className="h-dvh overflow-hidden relative py-20">
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
                    className={`card w-[90%] mb-6 gap-4 bg-[#FFFCFC] rounded-xl`}
                >
                    <p className="text-xs">
                        {userInfo
                            ? `${userInfo.username}さんの今回の目標`
                            : "Userさんの今回の目標"}
                    </p>
                    <p className="text-[#FF9233]">
                        {report ? report.goal : "目標が設定されていません"}
                    </p>
                    <button
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
