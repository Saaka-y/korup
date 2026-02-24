import { useRouter } from "next/navigation";
import { useUserStore } from "../stores/userStore";

// Custom hook to handle logout
export const useLogoutUser = () => {
    const router = useRouter();
    const setLoggedIn = useUserStore((state) => state.setLoggedIn);

    const logoutUser = async () => {
        await fetch("http://localhost:8000/api/custom_auth/jwt/logout/", {
            method: "POST",
            credentials: "include",
        });

        setLoggedIn(false);
        router.push("/login");
    };

    return logoutUser;
};