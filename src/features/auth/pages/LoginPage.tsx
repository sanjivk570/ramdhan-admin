import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
            <h1 className="mb-6 text-center text-3xl font-bold">
                Login
            </h1>
            <LoginForm />
        </div>
    );
}