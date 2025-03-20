import { getCurrentSession, invalidateSession } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function logout(): Promise<void> {
	"use server";
	const { session } = await getCurrentSession();
	if (!session) {
		return redirect("login");
	}

	await invalidateSession(session.id);
	//await deleteSessionTokenCookie();
	return redirect("login");
}

export default async function Page() {
	return (
		<>
			<form action={logout}>
				<button>Sign out</button>
			</form>
		</>
	);
}