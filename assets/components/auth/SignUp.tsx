import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useActionState, useState} from "react";
import {LoaderButton} from "@/components/utils/LoaderButton";
import {useStore} from "@/store";

export const SignUpForm = () => {
    const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(null);
    const setUser = useStore(state => state.setUser);

    const action = async (_: Awaited<void | undefined>, formData: FormData) => {
        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (!res.ok) {
            const errorData = await res.json();

            (errorData.violations as { propertyPath: string, title: string }[]).forEach(violation => {
                setErrors(prevState => {
                    if (prevState && prevState[violation.propertyPath]) {
                        return {
                            ...prevState,
                            [violation.propertyPath]: [
                                ...prevState[violation.propertyPath],
                                violation.title
                            ]
                        };
                    }

                    return {
                        ...prevState,
                        [violation.propertyPath]: [violation.title]
                    };
                })
            })
        }

        setUser(await res.json());
    }

    console.log(errors);

    const [_, registration, pending] = useActionState(action, undefined);

    return (
        <form action={registration} className="space-y-5">
            <div className="space-y-4">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                />
                {errors && errors.email && (
                    <ul className="text-red-500 text-sm space-y-2 list-disc">
                        {errors.email.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="space-y-4">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                />
                {errors && errors.password && (
                    <ul className="text-red-500 text-sm space-y-2 list-disc">
                        {errors.password.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="space-y-4">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                />
                {errors && errors.confirmPassword && (
                    <ul className="text-red-500 text-sm space-y-2 list-disc">
                        {errors.confirmPassword.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}
            </div>
            {/*{error && <div className="text-red-500 text-sm">{error}</div>}*/}
            <LoaderButton loading={pending} className="w-full" type="submit" disabled={pending}>
                Sign Up
            </LoaderButton>
        </form>
    );
}
