import React from 'react'
import Privacy from '../../components/landing-page/Privacy'
import Head from "next/head";

function index() {
  return (
    <div>
      <Head>
        <meta name="author" content="chala" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
        <Privacy/>
    </div>
  )
}

export default index