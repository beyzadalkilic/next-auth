"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <button
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => signIn("auth0")}
            >
                Login with Auth0
            </button>
        </div>
    );
}
