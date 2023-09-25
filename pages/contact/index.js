import React from 'react'
import ContactUs from '../../components/landing-page/ContactUs'
import Head from "next/head";

function index() {
  return (
    <div>
      <Head>
        <meta name="author" content="chala" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ContactUs/>
    </div>
  )
}

export default index