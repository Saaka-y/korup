"use client";
import Header from "@/app/components/Header";
import NextLessonCard from "@/app/components/NextLessonCard";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types/IUser";
import { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { useLatestReportStore } from "@/app/stores/reportStore";
import { fetchUserInfo } from "@/app/services/fetchUserInfo";
import { fetchLatestReport } from "@/app/services/fetchLatestReport";
import { Report } from "@/types/IReport";

// 共通Tailwindクラス
const tryButton = "bg-[#F54E4E] px-8 py-1 rounded-full text-white";
const grayBox = "border-2 border-[#E4EBEC] rounded-md";

export default function Account() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [report, setReport] = useState<Report | null>(null);
    const { loggedIn, setId, setStudentId, setTutorId, setRole, setEmail } =
        useUserStore();
    const {
        setGoal,
        setActionItem1,
        setActionItem2,
        setAchievementLevel,
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
        const getLatestReport = async () => {
            if (userInfo) {
                const data = await fetchLatestReport({
                    id: userInfo.student_id,
                });
                setReport(data);
                if (data) {
                    setGoal(data.goal);
                    setActionItem1(data.action_item_1);
                    setActionItem2(data.action_item_2);
                    setAchievementLevel(data.achievement_level);
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
                        {report ? report.goal : "目標が設定されていません"}
                    </p>
                    {report ? (
                        <>
                            <p className="text-sm text-[#e0802c] ">
                                1. {report.action_item_1}{" "}
                            </p>
                            <p className="text-sm text-[#FF9233] ">
                                2. {report.action_item_2}{" "}
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
