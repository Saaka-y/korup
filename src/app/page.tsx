
import Header from "@/app/components/Header";
import NextLessonCard from "@/app/components/NextLessonCard";
import Footer from "@/app/components/Footer";

// 共通Tailwindクラス
const tryButton = "bg-[#F54E4E] px-8 py-1 rounded-full text-white";
const grayBox = "border-2 border-[#E4EBEC] rounded-md";


export default function Home() {

    return (
        <div className="h-dvh overflow-hidden relative py-20">
            <Header />
            <main className="h-full flex flex-col justify-center items-center gap-4">
                <NextLessonCard grayBox={grayBox} />
                
                {/* DailyTaskCard */}
                <section id="daily-task-card" className={`card w-full gap-4 bg-[#F9E4D1]`}>
                    <p className="text-xl">5 mins challenge!</p>
                    <p className="text-[#F54E4E]">Jan 27, Tue</p>
                    {/* 課題に進むボタン */}
                    <div className="flex flex-row justify-center gap-5">
                        <div className={`flex flex-col justify-center items-center gap-2 bg-(--color-background) px-6 py-4 rounded-md shadow-xl/20`}>
                            <p className="text-xs">シャドーイング</p>
                            <button className={tryButton}>Try</button>
                        </div>
                        <div className={`flex flex-col justify-center items-center gap-2 bg-(--color-background) px-6 py-4 rounded-md shadow-xl/20`}>
                            <p className="text-xs">表現力アップ</p>
                            <button className={tryButton}>Try</button>
                        </div>
                    </div>
                </section>

                {/* GoalCard */}
                <section id="goal-card" className={`card w-[90%] mb-6 gap-4 bg-[#FFFCFC] rounded-xl`}>
                    <p className="text-xs">〇〇さんの今回の目標</p>
                    <p className="text-[#FF9233]">文脈から予想して質問に答えられる</p>
                    <button className={`bg-(--color-background) ${grayBox} px-6 py-1`}>前回のレポート</button>
                </section>
            </main>

            {/* フッター */}
            <Footer />
        </div>
    );
}
