import { useRouter } from "next/navigation";
import { useUserStore } from "../stores/userStore";
import { apiFetch } from "@/app/services/api-client";

// Custom hook to handle logout
export const useLogoutUser = () => {
    const router = useRouter();
    const clearUser = useUserStore((state) => state.clearUser);

    const logoutUser = async () => {
        await apiFetch("/api/custom_auth/jwt/logout/", {
            method: "POST",
            skipAuthRefresh: true,
        });

        clearUser();
        router.push("/login");
    };

    return logoutUser;
};