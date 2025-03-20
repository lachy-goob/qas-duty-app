'use client'

import Link from 'next/link';

export default function Footer() {

    return (
        <footer className = "bg-white dark:bg-black border-solid shadow-white dark:shadow-black shadow-xl">
            <div className= "w-full flex flex-row gap-5 justify-end">
                <Link className = "hover:text-gray-500" href='/Contact'>Contact</Link>
                <Link className = "hover:text-gray-500 mr-5" href='/About'>About</Link>
            </div>
        </footer>
    )
}