
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { apiFetch } from "@/app/services/api-client";

type LoginUserProps = {
    username: string;
    password: string;
    setLoggedIn: (loggedIn: boolean) => void;
    router: AppRouterInstance;
};

export async function loginUser({ username, password, setLoggedIn, router }: LoginUserProps) {

    try {
        const res = await apiFetch('/api/custom_auth/jwt/create/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            skipAuthRefresh: true,
        });

        if (!res.ok) {
            console.error('ログイン失敗');
            alert('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
            return;
        }

        setLoggedIn(true);
        router.push("/account"); // Next.jsのルーティングで遷移

    } catch (error) {
        console.error('Error fetching token:', error);
        return;
    }
}
