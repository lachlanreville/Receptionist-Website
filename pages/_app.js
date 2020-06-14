import Head from "next/head"
import './styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Receptionist</title>
                <link rel="icon" type="image/png" href="https://receptioni.st/img/Logo-3.png" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}