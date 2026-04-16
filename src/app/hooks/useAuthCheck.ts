"use client";
import { useEffect } from "react";
import { apiFetch } from "@/app/services/api-client";
import { useUserStore } from "../stores/userStore";

export function useAuthCheck() {
    const setLoggedIn = useUserStore((state) => state.setLoggedIn);
    const setFirstName = useUserStore((state) => state.setFirstName);
    const setRole = useUserStore((state) => state.setRole);
    const clearUser = useUserStore((state) => state.clearUser);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await apiFetch("/api/user/me/");
                if (res.ok) {
                    const data = await res.json();
                    setLoggedIn(true);
                    setFirstName(data.first_name);
                    setRole(data.role);
                } else {
                    clearUser();
                }
            } catch (error) {
                console.error("Error checking auth:", error);
                clearUser();
            }
        };
        checkAuth();
    }, [clearUser, setFirstName, setLoggedIn, setRole]);
}