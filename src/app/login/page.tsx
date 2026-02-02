import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {

    return (
        <div className="h-dvh flex flex-col justify-center items-center bg-[#FFF7F0]">
            <div className="w-full max-w-md flex flex-col items-center gap-8">
                <h1 className="text-3xl font-bold text-[#FF9233] mb-2 mt-8">KORUP</h1>
                <LoginForm />
            </div>
        </div>
    );
}
