
type AuthAPIProps = {
    username: string;
    password: string;
    setLoggedIn: (loggedIn: boolean) => void;
};

export async function authAPI({ username, password, setLoggedIn }: AuthAPIProps) {

    try {
        const res = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        console.log('Token data:', data);

        if (!res.ok || !data.access) {
            console.error('ログイン失敗');
            alert('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
            return;
        }

        // localStorageにトークンを保存する
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        setLoggedIn(true);
        window.location.href = "/account";  // accountページにリダイレクト

    } catch (error) {
        console.error('Error fetching token:', error);
        return;
    }
}
