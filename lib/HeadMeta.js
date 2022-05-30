import React from 'react'
import Head from "next/head";

export default function HeadMeta() {
  return <Head>
    <title>SUP2FREDY</title>
    <meta name="theme-color" content="#000000"/>
    <meta name="SUP2FREDY" content="What's up to Fredy?!" />
    <link rel="icon" type="image/png" href="/icon-192x192.png" />
    <link
        rel="preload"
        href="/fonts/CinzelDecorative-Regular.ttf"
        as="font"
        crossOrigin=""
    />
    <link
        rel="preload"
        href="/fonts/CinzelDecorative-Bold.ttf"
        as="font"
        crossOrigin=""
    />
    <link
        rel="preload"
        href="/fonts/CinzelDecorative-Black.ttf"
        as="font"
        crossOrigin=""
    />
  </Head>
}
