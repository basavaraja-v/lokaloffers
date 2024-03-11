import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: "Lokal Offers - Your Local Deals Directory",
  description: "Find the best local deals and offers tailored just for you. Shop smart with LokalOffers!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
