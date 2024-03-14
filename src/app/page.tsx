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
    shopName: 'Croma',
    headline: 'UNLIMITED 5% off on Windows laptops above ₹50,000 Show code: CCLLAP58H2',
    description: "Summer offers you just can't refuse! Use these special coupon code to get UNLIMITED 5% off on Windows laptops above ₹50,000",
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store',
    lat: 12.295810,
    lon: 76.639381
  },
  {
    id: '1',
    shopName: 'Croma',
    headline: 'UNLIMITED 7% off on refrigerators Show code: CCLREF7N8I',
    description: "Summer offers you just can't refuse! Use these special coupon code to get UNLIMITED 7% off on refrigerators",
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store',
    lat: 12.295810,
    lon: 76.639381
  },
  {
    id: '1',
    shopName: 'Croma',
    headline: 'UNLIMITED 7% off on 2 or more split ACs Show code: CCLAC7D31',
    description: "Summer offers you just can't refuse! Use these special coupon code to get UNLIMITED 7% off on 2 or more split ACs",
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store',
    lat: 12.295810,
    lon: 76.639381
  },
  {
    id: '1',
    shopName: 'Croma',
    headline: 'UNLIMITED 5% off on 1 AC Show code: CCLAC54TK',
    description: "Summer offers you just can't refuse! Use these special coupon code to get UNLIMITED 5% off on 1 AC",
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store',
    lat: 12.295810,
    lon: 76.639381
  },
  {
    id: '1',
    shopName: 'VK Fruits',
    headline: 'Buy fruits up to ₹2000 to get 5% Off',
    description: 'Enjoy a diverse selection of fruits, ranging from grapes and watermelon to mango and beyond.',
    expirationDate: '2024-03-31',
    address: 'VK Fruits, Kantharaj Urs road, Saraswathipuram, Mysore',
    lat: 12.295810,
    lon: 76.639381
  },

];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  // Haversine formula to calculate distance
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

interface UserLocation {
  lat: number;
  lon: number;
}

interface Deal {
  id: string;
  shopName: string;
  headline: string;
  description: string;
  expirationDate: string;
  address: string;
  lat: number;
  lon: number;
}

export default function Home() {

  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearbyDeals, setNearbyDeals] = useState<Deal[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const filteredDeals = sampleDeals.filter((deal) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lon,
          deal.lat,
          deal.lon // Corrected to 'lon' to match the Deal interface
        );
        // Filter deals within a certain radius
        return distance <= 100;
      });
      setNearbyDeals(filteredDeals); // This should now work without type errors
    } else {
      setNearbyDeals(sampleDeals); // This is a simplistic approach
    }
  }, [userLocation]);

  const currentDeals = nearbyDeals.filter(deal => {
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
  }, [currentDeals]);

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

