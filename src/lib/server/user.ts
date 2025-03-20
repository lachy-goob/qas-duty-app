import { db } from "./db";

export async function createUser(googleId: string, email: string, name: string, picture: string): Promise<User> {
    const rows = await db `INSERT INTO user (google_id, email, name, picture) VALUES (${googleId}, ${email}, ${name}, ${picture}) RETURNING user.id`;
    
    if (rows.length === 0) {
        throw new Error("Unexpected error: No rows returned");
    }

    const row = rows[0];
    
    const user: User = {
        id: row.id,
        googleId,
        email,
        name,
        picture
    };
    return user;
}

export async function getUserFromGoogleId(googleId: string): Promise<User | null> {
    const rows = await db `SELECT id, google_id, email, name, path, picture FROM user WHERE google_id = ${googleId}`;
    
    if (rows.length === 0) {
        return null;
    }

    const row = rows[0];
    
    const user: User = {
        id: row.id,
        googleId: row.google_id,
        email: row.email,
        name: row.name,
        path: row.path,
        picture: row.picture
    };
    return user;
}

export interface User {
    id: number;
    email: string;
    googleId: string;
    name: string;
    picture: string;
    path?: string; // Optional if not always present
}