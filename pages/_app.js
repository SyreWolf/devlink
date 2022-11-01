import Head from 'next/head'
import '../styles/globals.css';
import 'animate.css';
import Layout from "../components/layout/layout";
import BoardContextProvider from "../contexts/board_context";
import Router from "next/router";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', (url) => setLoading(true));
  Router.events.on('routeChangeComplete', (url) => setLoading(false));
  
  return (
    <BoardContextProvider>
      <ToastContainer position="top-right" autoClose={4000} pauseOnHover={false} hideProgressBar={true} draggable={false} theme="dark"/>
      <Head>
        <title>Devlink | Board</title>
        <meta name="description" content="This page is an agile board" />
      </Head>
      <Layout title={Component.title} description={Component.description} header={Component.header}>
        <Component {...pageProps} />
      </Layout>
    </BoardContextProvider>
  );
}
