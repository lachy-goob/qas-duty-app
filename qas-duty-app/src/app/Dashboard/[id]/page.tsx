'use client'

import { useRouter } from 'next/router';

export default function Page() {
    
    const router = useRouter();

    return <p>Case: {router.query.id}</p>
}

export async function getStaticPaths() {

}

export async function getStaticProps({ params }) {
    
}