import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../validation/login.schema";
import type { LoginFormData } from "../validation/login.schema";
import { Button } from "@/components/ui/button";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {

    const login = useLogin();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: LoginFormData) {
        //console.log(data);
        login.mutate(data);
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
        >

            <input
                {...form.register("email")}
                placeholder="Email"
                className="w-full rounded border p-3"
            />

            <input
                type="password"
                {...form.register("password")}
                placeholder="Password"
                className="w-full rounded border p-3"
            />

            {/* <button
                type="submit"
                className="w-full rounded bg-blue-600 p-3 text-white"
            >
                Login
            </button> */}

            <Button
                type="submit"
                className="w-full"
                disabled={login.isPending}
            >
                {login.isPending
                    ? "Signing in..."
                    : "Login"}
            </Button>

        </form>
    );
}