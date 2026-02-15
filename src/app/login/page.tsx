
import { LoginForm } from "@/app/components/LoginForm";

export default function LoginPage() {

    return (
        <div className="h-dvh flex flex-col justify-center items-center">
            <div className="w-full max-w-md flex flex-col items-center gap-8">
                <LoginForm />
            </div>
        </div>
    );
}
