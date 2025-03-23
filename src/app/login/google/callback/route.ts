import { generateSessionToken, createSession, setSessionTokenCookie } from "@/lib/server/session";
import { google } from "@/lib/server/oauth";
import { cookies } from "next/headers";
import { createUser, getUserFromGoogleId } from "@/lib/server/user";
import { ObjectParser } from "@pilcrowjs/object-parser";
import { decodeIdToken, type OAuth2Tokens } from "arctic";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = (await cookies()).get("google_oauth_state")?.value ?? null;
	const codeVerifier = (await cookies()).get("google_code_verifier")?.value ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response("Please restart the process.", {
			status: 400
		});
	}

	if (state !== storedState) {
		return new Response("Please restart the process.", {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch {
		return new Response("Please restart the process.", {
			status: 400
		});
	}

	const claims = decodeIdToken(tokens.idToken());
	const claimsParser = new ObjectParser(claims);

	const googleId = claimsParser.getString("sub");
	const name = claimsParser.getString("name");
	const picture = claimsParser.getString("picture");
	const email = claimsParser.getString("email");

    const existingUser = await getUserFromGoogleId(googleId);
    if (existingUser !== null) {
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, existingUser.id); // Await the session creation
        setSessionTokenCookie(sessionToken, session.expiresAt); // Use the session's expiresAt
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    }

	const user = createUser(googleId, email, name, picture);
	const sessionToken = generateSessionToken();
	const session = createSession(sessionToken, (await user).id);
	setSessionTokenCookie(sessionToken, (await session).expiresAt);
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/"
		}
	});
}