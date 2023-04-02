
import Head from 'next/head';

export default function NoLocale() {

    return (<>
        <Head>
            <title>Sorry, no luck...</title>
            <meta name="description" lang="en" content="Eles Ismailov Web Developer" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="not-found">
            Not Available For Your Region yet.
        </div>
    </>)
}