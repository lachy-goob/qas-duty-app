import { encodeBase32LowerCaseNoPadding,encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

import { cookies } from "next/headers";
import { cache } from "react";

import {db} from "./db"


import type {User} from "./user"


export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

export async function createSession(token: string, userId: number): Promise <Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
    await db`
        INSERT INTO user_session (id, user_id, expires_at)
        VALUES (${session.id},${session.userId}, ${session.expiresAt}),`
    return session;
};


export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    // Query the session and user from the database
    const [row] = await db<{
        id: string;
        user_id: number;
        expires_at: Date;
        google_id: string;
        email: string,
        name: string,
        picture: string,
    }[]>`
        SELECT 
            user_session.id,
            user_session.user_id,
            user_session.expires_at,
            user.google_id,
            user.email,
            user.name,
            user.picture
            app_user.id AS user_id
        FROM user_session
        INNER JOIN app_user ON app_user.id = user_session.user_id
        WHERE user_session.id = ${sessionId}
    `;

    if (!row) {
        return { session: null, user: null };
    }

    const session: Session = {
        id: row.id,
        userId: row.user_id, // Ensure this is a number
        expiresAt: new Date(row.expires_at) // Convert to Date
    };

    const user: User = {
        id: row.user_id,
        googleId: row.google_id,
        name: row.name,
        email: row.email,
        picture: row.picture
    };

    // Check if the session has expired
    if (Date.now() >= session.expiresAt.getTime()) {
        await db`DELETE FROM user_session WHERE id = ${session.id}`;
        return { session: null, user: null };
    }

    // Refresh the session if it's close to expiring
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await db`
            UPDATE user_session
            SET expires_at = ${session.expiresAt}
            WHERE id = ${session.id}
        `;
    }

    return { session, user };
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
	const token = (await cookies()).get("session")?.value ?? null;
	if (token === null) {
		return { session: null, user: null };
	}
	const result = validateSessionToken(token);
	return result;
});

export async function invalidateSession(sessionId: string): Promise<void> {
	await db `DELETE FROM user_session WHERE id = ?", sessionId`;
}

export async function invalidateAllSessions(userId: number): Promise<void> {
	await db `DELETE FROM user_session WHERE user_id = ?", userId`;
}

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
	(await cookies()).set("session", token, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt
	});
}

export type SessionValidationResult =
    | { session: Session; user: User}
    | {session: null; user: null;}

export interface Session {
    id: string;
    userId: number;
    expiresAt: Date;
}
