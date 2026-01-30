"use client";

import Link from "next/link";
import { usePageStore } from "../stores/pageStore";
import { CiHome, CiClock1, CiChat1, CiCoffeeCup, CiMap } from "react-icons/ci";

// navリンク共通Tailwindクラス
const navLayout = "flex flex-col justify-center items-center text-xs px-2 py-1 rounded-md";
const inactiveBg = `${navLayout} bg-(--color-background)`;
const activeBg = `${navLayout} bg-[#FF9233] text-white`;


export default function Footer() {
    const { currentPage, setCurrentPage } = usePageStore();

    return (
        <footer className="absolute bottom-0  bg-(--color-background) h-20 w-full mt-2 ">
            <div className="absolute -top-2 left-0 w-full h-2 shadow-md pointer-events-none"></div>
            <nav className="h-full flex justify-around items-center">

                <Link
                    href="/"
                    className={`${currentPage === "home" ? activeBg : inactiveBg}`}
                    onClick={() => setCurrentPage("home")}
                >
                    <CiHome size={24} />
                    <span>Home</span>
                </Link>
                <Link
                    href="/booking"
                    className={`${currentPage === "booking" ? activeBg : inactiveBg}`}
                    onClick={() => setCurrentPage("booking")}
                >
                    <CiClock1 size={24} />
                    <span>予約</span>
                </Link>
                <Link
                    href="/chat"
                    className={`${currentPage === "chat" ? activeBg : inactiveBg}`}
                    onClick={() => setCurrentPage("chat")}
                >
                    <CiChat1 size={24} />
                    <span>チャット</span>
                </Link>
                <Link
                    href="/review"
                    className={`${currentPage === "review" ? activeBg : inactiveBg}`}
                    onClick={() => setCurrentPage("review")}
                >
                    <CiCoffeeCup size={24} />
                    <span>復習</span>
                </Link>
                <Link
                    href="/trajectory"
                    className={`${currentPage === "trajectory" ? activeBg : inactiveBg}`}
                    onClick={() => setCurrentPage("trajectory")}
                >
                    <CiMap size={24} />
                    <span>軌跡</span>
                </Link>

            </nav>
        </footer>
    );
}
