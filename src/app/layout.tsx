import React from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
  title?: string; // Allow title override if needed
  description?: string; // Allow description override if needed
}

const defaultTitle = 'Lokal Offers - Your Local Deals Directory';
const defaultDescription = 'Find the best local deals and offers tailored just for you. Shop smart with LokalOffers!';

export default function RootLayout({
  children,
  title = defaultTitle,
  description = defaultDescription,
}: RootLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        {/* Add other meta tags for SEO as needed */}
        {/* Add Open Graph / Social media tags */}
        {/* Add favicon links */}
        {/* Add any additional scripts or stylesheets */}
      </Head>
      <body className={inter.className}>{children}</body>
    </>
  );
}
