import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/server/session";

export default async function Home() {

  const { user } = await getCurrentSession();

  if (user === null) {
    return redirect("/login")
  }

  return (
    <>
    <div>Home page</div>
    <h1>Hi, {user.name}!</h1>
    <img src={user.picture} height="100px" width="100px" alt="profile" />
    <p>Email: {user.email}</p>

    </>
  );
}
