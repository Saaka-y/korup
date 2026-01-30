
import { CiShare1 } from "react-icons/ci";

// 共通Tailwindクラス
const buttonBase = "rounded-md text-white text-xs";


export default function NextLessonCard({grayBox}: {grayBox: string}) {

    return (

        <section id="next-lesson-card" className={`card w-full gap-2 bg-[#EBEBEB] px-8`}>
            {/* 白カード */}
            <div className={`bg-(--color-background) flex flex-col justify-center items-center rounded-md gap-2 h-[65%] w-full`}>
                {/* 次回レッスン日付 */}
                <div className="flex flex-row justify-center items-center gap-4 ">
                    <p className="text-[#6699B3] text-3xl">1 / 31 </p>
                    <p>13:00 ~ 14:00</p>
                </div>
                {/* google meet リンク */}
                <div className={`flex flex-row justify-center items-center gap-3 ${grayBox} mt-1`}>
                    <p className="text-xs mx-4 my-2">google.meet.link.eeeeeee</p>
                    <div className="w-10 h-full bg-[#EBEBEB] flex items-center justify-center">
                        <CiShare1 size={20} />
                    </div>
                </div>
                {/* 残りレッスン回数 */}
                <p className="text-xs">残りレッスン： <span className="text-3xl">1 </span>回</p>
            </div>
            {/* レッスン調整ボタン */}
            <div className="flex flex-row justify-between items-center gap-4 w-full">
                <button className={`bg-[#9B9898] w-1/2 py-2 ${buttonBase}`}>キャンセル</button>
                <button className={`bg-[#A8C2CE] w-1/2 py-2 ${buttonBase}`}>変更</button>
            </div>
        </section>

    );
}
