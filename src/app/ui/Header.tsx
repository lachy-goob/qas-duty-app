'use client'

import { qasLogo } from './images';
import {useRouter} from 'next/navigation'


export default function Header() {

    const Router = useRouter();

    return (
        <header className = "bg-white dark:bg-black border-solid shadow-white dark:shadow-black shadow-xl flex items-center r flex-col">
            <div onClick={() => Router.push('/')}>{qasLogo()}</div>
            <h1 className="">Queensland Ambulance Service - Duty Calculator</h1>
        </header>
    )
}