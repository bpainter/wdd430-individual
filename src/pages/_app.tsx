import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';
import Header from '../components/layout/Header';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';

function bpApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="flex h-screen overflow-hidden bg-gray-200">
        <Header />
        <Navigation />
        <main className="flex flex-col flex-grow pt-16 p-4 overflow-y-auto text-gray-700"> 
          <Component {...pageProps} />
          {/* <Footer /> */}
        </main>
      </div>
    </SessionProvider>
  );
}

export default bpApp;
