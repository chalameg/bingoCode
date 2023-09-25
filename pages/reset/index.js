import Head from "next/head";
import React from "react";
import ResetPassword from "../../components/reset-password/resetPassword";

function index() {
  return (
    <div>
      <Head>
        <meta name="author" content="bereket" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ResetPassword />
    </div>
  );
}

export default index;
