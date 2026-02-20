type FetchUserInfoProps = {
    loggedIn: boolean;
    setId: (id: number) => void;
    setStudentId: (student_id: number) => void;
    setTutorId: (tutor_id: number) => void;
    setRole: (role: string) => void;
    setEmail: (email: string) => void;
};

export async function fetchUserInfo({ loggedIn, setId, setStudentId, setTutorId, setRole, setEmail }: FetchUserInfoProps) {
    
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
        
        setRole(data.role);
        setEmail(data.email);
        setId(data.id);

        if (data.role === "student") {
            setStudentId(data.student_id);
        } else if (data.role === "tutor") {
            setTutorId(data.tutor_id);
        }

        console.log("fetchUserInfo result:", { loggedIn, data });
        

    } catch (error) {
        console.error("Error fetching user data:", error);
        return;
    }

    return data;

}
