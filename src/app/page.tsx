import Link from "next/link";
import { CiBellOn, CiShare1, CiHome, CiMap, CiCoffeeCup,CiChat1, CiClock1 } from "react-icons/ci";


export default function Home() {
    return (
        <div className="h-dvh overflow-hidden flex flex-col">

            {/* ヘッダー */}
            <header className="flex justify-between items-center px-4 shadow-lg h-20 w-full mb-2">
                <button className="text-xs">{"<<"} Learn more</button>
                <CiBellOn size={24} />
            </header>
            <main className="h-full flex flex-col  items-center  gap-2">

                {/* NextLessonCard */}
                <section id="next-lesson-card" className="flex flex-col justify-center items-center gap-2 bg-[#EBEBEB] shadow-lg h-1/3 w-full px-8 ">

                    {/* 白カード */}
                    <div className="bg-(--color-background)  flex flex-col justify-center items-center gap-2 h-[65%] w-full rounded-md">
                        {/* 次回レッスン日付 */}
                        <div className="flex flex-row justify-center items-center gap-4 ">
                            <p className="text-[#6699B3] text-3xl">1 / 31 </p>
                            <p>13:00 ~ 14:00</p>
                        </div>
                        {/* google meet リンク */}
                        <div className="flex flex-row justify-center items-center gap-3 border-2 border-[#E4EBEC] rounded-md mt-1">
                            <p className=" text-xs mx-4 my-2 " >google.meet.link.eeeeeee</p>
                            <div className=" w-10 h-full bg-[#EBEBEB] flex items-center justify-center">
                                <CiShare1 size={20} />
                            </div>
                        </div>
                        {/* 残りレッスン回数 */}
                        <p className=" text-xs">残りレッスン： <span className="text-3xl">1 </span>回</p>

                    </div>

                    {/* レッスン調整ボタン */}
                    <div className="flex flex-row justify-between items-center gap-4 w-full ">
                        <button className="bg-[#9B9898] w-1/2 py-2 rounded-md text-white text-xs">キャンセル</button>
                        <button className="bg-[#A8C2CE] w-1/2 py-2 rounded-md text-white text-xs">変更</button>
                    </div>

                </section>

                {/* DailyTaskCard */}
                <section id="daily-task-card " className="flex flex-col justify-center items-center gap-4 bg-[#F9E4D1]  shadow-lg h-1/3 w-full">

                    <p className="text-xl">5 mins challenge!</p>
                    <p className="text-[#F54E4E]">Jan 27, Tue</p>

                    {/* 課題に進むボタン */}
                    <div className="flex flex-row justify-center gap-5">
                        <div className="flex flex-col justify-center items-center gap-2 bg-(--color-background) px-6 py-4 rounded-md shadow-xl/20">
                            <p className="text-xs">シャドーイング</p>
                            <button className="bg-[#F54E4E] px-8 py-1 rounded-full text-white">Try</button>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 bg-(--color-background) px-6 py-4 rounded-md shadow-xl/20">
                            <p className="text-xs">表現力アップ</p>
                            <button className="bg-[#F54E4E] px-8 py-1 rounded-full text-white">Try</button>
                        </div>
                    </div>

                </section>

                {/* GoalCard */}
                <section id="goal-card" className="flex flex-col justify-center items-center gap-4 bg-[#FFFCFC] h-1/4 shadow-xl/20 w-[90%] rounded-xl">
                    <p className="text-xs">〇〇さんの今回の目標</p>
                    <p className="text-[#FF9233]">文脈から予想して質問に答えられる</p>
                    <button className="bg-(--color-background) border-2 border-[#E4EBEC] rounded-md px-6 py-1  ">前回のレポート</button>

                </section>
            </main>

            {/* フッター */}
            <footer className="bg-(--color-background) h-30 w-full mt-2 relative">
                <div className="absolute -top-2 left-0 w-full h-2 shadow-md pointer-events-none"></div>
                <nav className="h-full flex justify-around items-center">
                    <Link href="/" className="flex flex-col justify-center items-center text-sm">
                        <CiHome size={24} />
                        <span>Home</span>
                    </Link>
                    <Link href="/" className="flex flex-col justify-center items-center text-xs">
                        <CiClock1 size={24} />
                        <span>予約</span>
                    </Link> 
                    <Link href="/" className="flex flex-col justify-center items-center text-xs">
                        <CiChat1 size={24}  />
                        <span>チャット</span>
                    </Link> 
                    <Link href="/" className="flex flex-col justify-center items-center text-xs">
                        <CiCoffeeCup size={24} />
                        <span>復習</span>
                    </Link> 
                    <Link href="/" className="flex flex-col justify-center items-center text-xs">
                        <CiMap size={24} />
                        <span>軌跡</span>
                    </Link>
                </nav>

            </footer >
        </div>
    );
}
