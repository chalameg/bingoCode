import Head from "next/head";
import React from "react";
import ForgotPassword from "../../components/forgot-password/forgotPassword";

function index() {
  return (
    <div>
      <Head>
        <meta name="author" content="bereket" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ForgotPassword />
    </div>
  );
}

export default index;
