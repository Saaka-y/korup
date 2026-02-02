import Link from "next/link";
import React from "react";

const inputClass = "w-full px-4 py-2 border border-[#E4EBEC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9233] bg-white";
const buttonClass = "w-full bg-[#FF9233] text-white py-2 rounded-full mt-4 font-bold hover:bg-[#FF9233] transition";

export default function LoginForm() {

    return (
        <form className="flex flex-col gap-6 w-full max-w-xs p-8 rounded-xl shadow-xl/20">
            <h2 className="text-xl font-bold text-center mb-2">ログイン</h2>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm">メールアドレス</label>
                <input id="email" type="email" className={inputClass} placeholder="example@mail.com" required />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm">パスワード</label>
                <input id="password" type="password" className={inputClass} placeholder="********" required />
            </div>
            <button type="submit" className={buttonClass}>ログイン</button>
            <p className="text-xs text-center text-gray-400 mt-2">新規登録は <Link href="/register" className="underline">こちら</Link> から</p>
            <p className="text-xs text-center text-gray-400 mt-2">パスワードをお忘れですか？</p>
        </form>
    );
}
