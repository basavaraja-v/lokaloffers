"use client"

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DealCard from '../components/DealCard/DealCard';
import SearchBar from '../components/SearchBar/SearchBar';
// Sample data for deal cards - in a real app, this would come from your data fetching logic
const sampleDeals = [
  {
    id: '1',
    shopName: 'VK Fruits',
    headline: 'Buy fruits up to ₹2000 to get 5% Off',
    description: 'Enjoy a diverse selection of fruits, ranging from grapes and watermelon to mango and beyond.',
    expirationDate: '2024-03-31',
    address: 'VK Fruits, Kantharaj Urs road, Saraswathipuram, Mysore'
  },
  {
    id: '1',
    shopName: 'Croma',
    headline: 'LED TVs Up to 60% off',
    description: 'A secret Out of the Box sale is happening at a Croma store near you.',
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store'
  },
  {
    id: '1',
    shopName: 'Croma',
    headline: 'Smartphones - Up to 45% off',
    description: 'A secret Out of the Box sale is happening at a Croma store near you.',
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store'
  },
  {
    id: '1',
    shopName: 'Croma',
    headline: 'Laptops - Up to 40% off',
    description: 'A secret Out of the Box sale is happening at a Croma store near you.',
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store'
  },
  {
    id: '1',
    shopName: 'Croma',
    headline: 'ACs - Up to 40% off',
    description: 'A secret Out of the Box sale is happening at a Croma store near you.',
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store'
  },
  {
    id: '1',
    shopName: 'Croma',
    headline: 'Refrigerators - Up to 35% off',
    description: 'A secret Out of the Box sale is happening at a Croma store near you.',
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store'
  },
];


export default function Home() {
  // Assuming futureDeals is already filtered as shown previously
  const currentDeals = sampleDeals.filter(deal => {
    const today = new Date();
    const expirationDate = new Date(deal.expirationDate);

    // Set both dates to start of the day for comparison
    today.setHours(0, 0, 0, 0);
    expirationDate.setHours(0, 0, 0, 0);

    return expirationDate >= today;
  });

  // Function to get random deals for the first row
  const getRandomDeals = (deals: { id: string; shopName: string; headline: string; description: string; expirationDate: string; address: string; }[], count: number | undefined) => {
    const shuffled = [...deals].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const [randomDeals, setRandomDeals] = useState(() => getRandomDeals(currentDeals, 2));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomDeals(getRandomDeals(currentDeals, 2));
    }, 5000); // Update the deals every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Head>
        <title>Lokal Offers - Find the Best Local Deals</title>
        <meta name="description" content="Discover amazing deals and offers near you with Lokal Offers. Save big on shopping, dining, and more." />
        {/* Other SEO tags */}
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center p-6 container mx-auto">
        {/* First Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* First Column */}
          <div className="w-full animate-fadeIn">
            {randomDeals[0] && <DealCard deal={randomDeals[0]} />}
          </div>

          {/* Second Column */}
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center mb-2">Your Hyper Local Deals</h2>
            <p className="text-lg text-center mb-4">Find the best deals near you!</p>
            <SearchBar />
          </div>

          {/* Third Column */}
          <div className="w-full animate-fadeIn">
            {randomDeals[1] && <DealCard deal={randomDeals[1]} />}
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDeals.length > 0 ? (
            currentDeals.map((deal) => <DealCard key={deal.id} deal={deal} />)
          ) : (
            <p className="col-span-full">No deals available right now. Check back later!</p>
          )}
        </div>
      </main>


      <Footer />
    </>
  );
}

