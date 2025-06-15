import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import * as React from "react";
import {SignUpForm} from "@/components/auth/SignUp";
import {LoginForm} from "@/components/auth/Login";

export const AuthForm = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm/>
                    </TabsContent>
                    <TabsContent value="signup">
                        <SignUpForm/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
