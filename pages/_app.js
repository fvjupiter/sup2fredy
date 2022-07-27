import '../styles/globals.css'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Layout from '../components/layout/Layout'

function MyApp({ Component, pageProps }) {
  return <>
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
    {/* <script src="https://www.google.com/recaptcha/api.js" async defer></script> */}
    {/* <script src="https://www.google.com/recaptcha/enterprise.js?render=6Lc5K1YgAAAAAM0wABPpdkwTPrsvDPW4dX84NrE0"></script> */}
  </>
}

export default MyApp
