type FetchUserInfoProps = {
    loggedIn: boolean;
};

export async function fetchUserInfo({  loggedIn }: FetchUserInfoProps) {
    
    console.log("fetchUserInfo called with:", { loggedIn });
    let data = null;

    try {
        if (!loggedIn) return;
        const accessToken = localStorage.getItem("access_token");
        const res = await fetch("http://localhost:8000/api/user/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        data = await res.json();
        console.log("User data:", data);

        if (!res.ok || !data) {
            console.error("取得失敗");
            alert("ユーザー情報の取得に失敗しました。");
            return;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return;
    }

    return data;

}
