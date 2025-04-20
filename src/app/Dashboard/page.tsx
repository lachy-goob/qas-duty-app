import { currentUser } from "@clerk/nextjs/server";
import { db } from "../db";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="">
          Welcome to the Dashboard: <br></br>
          User: {user?.firstName + " " + user?.lastName}
        </div>
        <div>List of most recent jobs: (5)</div>
        <Link className="bg-green-500" href={"/Dashboard/New"}>
          CREATE NEW JOB HERE
        </Link>
      </div>
    </div>
  );
}
