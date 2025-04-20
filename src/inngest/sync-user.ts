import { inngest } from "./client";
import { db } from "@/app/db";
import { User } from "@/app/db/schema";
import { redirect } from "next/navigation";

export const syncUser = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("Received user data:", event.data);
    const user = event.data;

    if (!user.first_name || !user.last_name || !user.email_addresses) {
      throw new Error("Missing required user data");
    }

    const email = user.email_addresses[0]?.email_address;
    if (!email) {
      throw new Error("No email address found");
    }

    try {
      await db.insert(User).values({
        first_name: user.first_name,
        last_name: user.last_name,
        email: email,
      });
    } catch {
      throw new Error("Error Inputting Data into DB");
    }

    redirect("/Dashboard");
  }
);
