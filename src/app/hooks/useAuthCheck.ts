"use client";
import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";

export function useAuthCheck() {
    const setLoggedIn = useUserStore((state) => state.setLoggedIn);
    const setUsername = useUserStore((state) => state.setUsername);
    const setStudentNumber = useUserStore((state) => state.setStudentNumber);
    const setTutorNumber = useUserStore((state) => state.setTutorNumber);
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
                setRole(data.role);
                setEmail(data.email);
                if (data.role === "student") {
                    setStudentNumber(data.student_number);
                } else if (data.role === "tutor") {
                    setTutorNumber(data.tutor_number);
                }
            } else {
                setLoggedIn(false);
            }
        };
        checkAuth();
    }, []);
}