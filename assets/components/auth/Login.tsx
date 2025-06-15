import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useActionState} from "react";
import {LoaderButton} from "@/components/utils/LoaderButton";
import {toast} from "sonner";
import {useStore} from "@/store";

export const LoginForm = () => {
    const setUser = useStore(state => state.setUser);
    const action = async (_: Awaited<void | undefined>, formData: FormData) => {
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (!res.ok) {
            toast.error((await res.json()).message);
            return;
        }

        setUser(await res.json());
    }

    const [_, login, pending] = useActionState(action, undefined);

    return (
        <form action={login} className="space-y-5">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="username"
                    type="email"
                    autoComplete="email"
                    required
                />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                />
            </div>
            {/*{error && <div className="text-red-500 text-sm">{error}</div>}*/}
            <LoaderButton loading={pending} className="w-full" type="submit">
                Login
            </LoaderButton>
        </form>
    );
}
