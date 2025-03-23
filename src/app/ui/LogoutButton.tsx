"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/logout");

        router.push("/");
    };

    return (
        <button onClick={handleLogout}>Log Out</button>
    );
}