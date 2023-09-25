import React from 'react'
import About from '../../components/landing-page/About'
import Head from "next/head";

function index() {
  return (
    <div>
       <Head>
        <meta name="author" content="chala" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
        <About/>
    </div>
  )
}

export default index