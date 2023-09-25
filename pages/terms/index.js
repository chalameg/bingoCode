import React from 'react'
import Terms 
from '../../components/landing-page/Terms';
import Head from "next/head";


function index() {
  return (
    <div>
      <Head>
        <meta name="author" content="chala" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
        <Terms/>
    </div>
  )
}

export default index