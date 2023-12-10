import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';
import Header from '../components/layout/Header';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';

function bpApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Navigation />
      <main className="flex flex-col w-5/10 p-4 overflow-auto">
        <Component {...pageProps} />
        <Footer />
      </main>
    </SessionProvider>
  );
}

export default bpApp;
