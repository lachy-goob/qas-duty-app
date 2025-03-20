import Link from "next/link";

export default function Page() {

    return (
        <div className = "flex flex-col h-max justify-start items-center">
            <h1 className = "mb-30 mt-30 text-2xl font-bold">About</h1>
        <p>This Website was designed for the Queensland Ambulance Service and the ability for <b>certain</b> individuals to track duty hours.</p>
        <p>That&apos;s about it.</p>
        <Link className ="flex items-center justify-center mt-20 bg-red-500 rounded-2xl w-32 h-8 hover:bg-red-400" href='/'>Take me home</Link>

        </div>
    )
}