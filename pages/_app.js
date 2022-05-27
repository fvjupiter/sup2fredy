import '../styles/globals.css'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return <>
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  </>
}

export default MyApp
