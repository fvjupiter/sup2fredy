import '../styles/globals.css'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Layout from '../components/layout/Layout'
import Install from '../components/Install'

function MyApp({ Component, pageProps }) {
  return <>
    <RecoilRoot>
      <Install />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  </>
}

export default MyApp
