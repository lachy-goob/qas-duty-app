import Link from "next/link";

export default function Page() {
    return (
        <div className = "h-max flex justify-center items-center flex-col">
        <p>Please don't...</p>
        <p>I'll add an email for features/bugs later</p>
        <Link className ="flex items-center justify-center mt-20 bg-red-500 rounded-2xl w-32 h-8 hover:bg-red-400" href='/'>Take me home</Link>
        </div>
    )
}