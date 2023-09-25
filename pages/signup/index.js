import Head from "next/head";
import React from "react";
import SignUp from "../../components/landing-page/SignUp";

function index() {
  return (
    <div>
      <Head>
        <meta name="author" content="bereket" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SignUp />
    </div>
  );
}

export default index;
