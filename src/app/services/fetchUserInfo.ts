type FetchUserInfoProps = {
    loggedIn: boolean;
    setStudentNumber: (student_number: number) => void;
    setTutorNumber: (tutor_number: number) => void;
    setRole: (role: string) => void;
    setEmail: (email: string) => void;
};

export async function fetchUserInfo({ loggedIn, setStudentNumber, setTutorNumber, setRole, setEmail }: FetchUserInfoProps) {
    
    console.log("fetchUserInfo called with:", { loggedIn });
    let data = null;

    try {
        if (!loggedIn) return;
        const res = await fetch("http://localhost:8000/api/user/me/", {
            method: "GET",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            },
        });

        data = await res.json();
        console.log("User data:", data);


        if (!res.ok) {
            console.error("取得失敗");
            alert("ユーザー情報の取得に失敗しました。");
            return;
        }
        
        setRole(data.role);
        setEmail(data.email);

        if (data.role === "student") {
            setStudentNumber(data.student_number);
        } else if (data.role === "tutor") {
            setTutorNumber(data.tutor_number);
        }

        console.log("fetchUserInfo result:", { loggedIn, data });
        

    } catch (error) {
        console.error("Error fetching user data:", error);
        return;
    }

    return data;

}
