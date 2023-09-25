import Head from "next/head";
import React from "react";
import Blog from "../../components/landing-page/Blog";

function index() {
  return (
    <div>
      <Head>
        <meta name="author" content="bereket" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Blog />
    </div>
  );
}

export default index;
