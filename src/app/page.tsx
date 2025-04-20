import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import QasLogo from "./ui/images";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <div className="flex flex-col items-center gap-4 bg-gray-800 p-20 rounded-2xl">
        <div className="flex flex-col pb-20 items-center justify-center">
          <div className="pb-2">
            <QasLogo />
          </div>
          <h1 className="font-bold">Duty Calculator</h1>
        </div>
        <div className="flex gap-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
        </div>
        <SignedIn>
          <Link href="/Dashboard"> Enter </Link>
        </SignedIn>
      </div>
    </div>
  );
}
