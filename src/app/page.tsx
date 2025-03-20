import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/server/session";

export default async function Home() {

  const { user } = await getCurrentSession();

  if (user === null) {
    return redirect("/login")
  }

  return (

    

    <div>Home page</div>
  );
}
