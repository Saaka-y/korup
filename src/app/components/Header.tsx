"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLogoutUser } from "@/app/services/logoutUser";
import { CiBellOn, CiMenuKebab } from "react-icons/ci";

export default function Header() {
    const [open, setOpen] = useState(false);
    const logoutUser = useLogoutUser();

    return (
        <header className="fixed top-0 left-0 h-15 md:h-30 w-full mb-2 px-4 md:px-10 bg-(--background) shadow-sm z-50">
            <div
                className="flex justify-between
         items-center h-full"
            >
                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-full hover:bg-[#F9E4D1] transition"
                    aria-label="メニューを開く"
                >
                    <CiMenuKebab size={24} />
                </button>
                <Image src="/logo.png" alt="Logo" width={80} height={80} />
                <CiBellOn size={24} />
            </div>

            {/* サイドメニュー */}

            <div
                className={
                    open
                        ? "fixed inset-0 bg-black/40 z-40"
                        : "pointer-events-none "
                }
                onClick={() => setOpen(false)}
            >
                <nav
                    className={`fixed top-0 left-0 h-full w-64 bg-white/70 z-50 shadow-lg transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
                    style={{ willChange: "transform" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col p-6 gap-4">
                        <p className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                            <span>
                                My Curriculum
                                <span className="block mt-1 text-xs text-gray-500">
                                    専用カリキュラム
                                </span>
                            </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                            <span>
                                My Vocabulary
                                <span className="block mt-1 text-xs text-gray-500">
                                    マイ単語帳
                                </span>
                            </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                            <span>
                                KORU Materials
                                <span className="block mt-1 text-xs text-gray-500">
                                    KORUオリジナル教材
                                </span>
                            </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                            <span>
                                Other Materials
                                <span className="block mt-1 text-xs text-gray-500">
                                    外部おすすめ教材
                                </span>
                            </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                            <span>
                                KORU Guide
                                <span className="block mt-1 text-xs text-gray-500">
                                    KORUのいろは
                                </span>
                            </span>
                        </p>
                        <Link
                            href="/login"
                            className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                            onClick={logoutUser}
                        >
                            <span>
                                Sign out
                                <span className="block mt-1 text-xs text-gray-500">
                                    サインアウト
                                </span>
                            </span>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
