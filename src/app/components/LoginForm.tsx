"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useUserStore } from "../stores/userStore";
import { loginUser } from "@/app/services/loginUser";

const inputClass =
    "w-full px-4 py-2 border border-[#E4EBEC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9233] bg-white";
const buttonClass =
    "w-full bg-[#FF9233] text-white py-2 rounded-full mt-4 font-bold hover:bg-[#FF9233] transition";

export function LoginForm() {
    const [password, setPassword] = useState<string>("");
    const { username, setUsername, setLoggedIn } = useUserStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser({ username, password, setLoggedIn }); // accountページへ移行

        setUsername(username); 
    };

    return (
        <form
            className="flex flex-col gap-6 w-full max-w-xs p-8 rounded-xl shadow-xl/20"
            onSubmit={handleSubmit}
        >
            <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                className="text-center mx-auto"
                loading="eager"
            />
            <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-sm">
                    ユーザー名
                    <br />
                    <span className="text-xs text-gray-500">
                        （下の名前をローマ字で入力）
                    </span>
                </label>
                <input
                    id="username"
                    type="text"
                    className={inputClass}
                    placeholder="例: Taro"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm">
                    パスワード
                </label>
                <input
                    id="password"
                    type="password"
                    className={inputClass}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className={buttonClass}>
                ログイン
            </button>
            <p className="text-xs text-center text-gray-400 mt-2">
                新規登録は{" "}
                <Link href="/register" className="underline">
                    こちら
                </Link>{" "}
                から
            </p>
            <p className="text-xs text-center text-gray-400 mt-2">
                パスワードをお忘れですか？
            </p>
        </form>
    );
}
