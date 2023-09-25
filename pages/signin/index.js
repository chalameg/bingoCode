import Head from "next/head";
import React from "react";
import SignIn from "../../components/landing-page/SignIn";

function index() {
  return (
    <div>
      <Head>
        <meta name="author" content="bereket" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SignIn />
    </div>
  );
}

export default index;
