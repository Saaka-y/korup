"use client";
import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";

export function useAuthCheck() {
    const setLoggedIn = useUserStore((state) => state.setLoggedIn);
    const setUsername = useUserStore((state) => state.setUsername);
    const setId = useUserStore((state) => state.setId);
    const setStudentId = useUserStore((state) => state.setStudentId);
    const setTutorId = useUserStore((state) => state.setTutorId);
    const setRole = useUserStore((state) => state.setRole);
    const setEmail = useUserStore((state) => state.setEmail);

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("http://localhost:8000/api/user/me/", {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setLoggedIn(true);
                setUsername(data.username);
                setId(data.id);
                setRole(data.role);
                setEmail(data.email);
                if (data.role === "student") {
                    setStudentId(data.student_id);
                } else if (data.role === "tutor") {
                    setTutorId(data.tutor_id);
                }
            } else {
                setLoggedIn(false);
            }
        };
        checkAuth();
    }, []);
}