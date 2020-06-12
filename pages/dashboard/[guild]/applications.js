import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Applications() {
    const router = useRouter();
    const { guild } = router.query
    console.log(router)

    return (
        <main>
            <p>cats = {guild}</p>
        </main>
    )
}
