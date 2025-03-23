import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/server/session";
import Image from "next/image";

export default async function Home() {

  const { user } = await getCurrentSession();

  if (user === null) {
    return redirect("/login")
  }

  return (
    <>
    <div>Home page</div>
    <h1>Hi, {user.name}!</h1>
    <Image src={user.picture} height="100" width="100" alt="profile" />
    <p>Email: {user.email}</p>

    </>
  );
}
