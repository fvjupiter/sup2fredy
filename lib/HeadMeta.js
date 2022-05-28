import React from 'react'
import Head from "next/head";

export default function HeadMeta() {
  return <Head>
    <title>SUP2FREDY</title>
    <meta name="SUP2FREDY" content="" />
    <link rel="icon" type="image/png" href="/img/pinkSpiral.jpg" />
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
