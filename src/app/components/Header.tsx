"use client";
import Image from "next/image";
import Link from "next/link";
import { CiBellOn, CiMenuKebab } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../stores/userStore";

export default function Header() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const setIsLoggedIn = useUserStore((state) => state.setLoggedIn);

    // 一旦のログアウト処理、本来はAPIにリクエストしてトークンを無効化するなどの処理が必要
    const handleLogout = () => {
        setIsLoggedIn(false);
        router.push("/login");
    };

    return (
        <header className="absolute top-0 left-0 h-15 md:h-30 w-full mb-2 px-4 md:px-10 z-50">

            <div className="flex justify-between
         items-center h-full">
                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-full hover:bg-[#F9E4D1] transition"
                    aria-label="メニューを開く"
                >
                    <CiMenuKebab size={24}  />
                </button>
                <Image src="/logo.png" alt="Logo" width={80} height={80} />
                <CiBellOn size={24}  />
            </div>

            {/* サイドメニュー */}

            <div
                className={open ? "fixed inset-0 bg-black/40 z-40" : "pointer-events-none "}
                onClick={() => setOpen(false)}
            >
                <nav
                    className={`fixed top-0 left-0 h-full w-64 bg-white/70 z-50 shadow-lg transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
                    style={{ willChange: "transform" }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex flex-col p-6 gap-4">
                        <Link
                            href="/login"
                            className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                            onClick={handleLogout}
                        >
                            Sign out
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
