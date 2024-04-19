"use client"

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DealCard from '../components/DealCard/DealCard';
import SearchBar from '../components/SearchBar/SearchBar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const sampleDeals = [

  {
    shopName: "KSIC Mysore Silk",
    "headline": "Up to 20% off on Mysore Silk Sarees",
    "description": "Enjoy up to 20% off on Mysore Silk Sarees at KSIC Mysore Silk outlets across Karnataka and Chennai. Discover the newly printed Digital Silk sarees. High-quality pure natural silk and 100% pure gold zari that remains fresh over long periods.",
    "expirationDate": "2024-12-31",
    "address": "KSIC Mysore Silk outlets across Karnataka and Chennai",
    "lat": 12.2958,
    "lon": 76.6394
  },
  {
    shopName: "Fashion Factory",
    "headline": "We miss you at Fashion Factory!",
    "description": "Claim your Special offer of Rs.300 OFF on minimum shopping of Rs.1499 over and above the ongoing offers on top apparel brands like Levi’s, Lee Cooper, Raymond and more! 🎉 \n Use Code FFRTUBSGQU3107 till 28th April.Don’t miss out on the chance to save big, visit our store & avail fantastic deals! 🛍️ \n📍relff.com / ffstores\n Happy Shopping! 🥳",
    "expirationDate": "2024-04-28",
    "address": "Ground Floor, Keerthana Complex, near Railway Under Bridge, Krishnamurthy Puram, Mysuru, Karnataka 570004",
    "lat": 12.971599,
    "lon": 77.594566
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
  const heroTitle = "Unmissable Local Deals";
  const heroDescription = "Explore exclusive deals in your area! From dress to electronics, find discounts that make a difference.";
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [userLocation, searchQuery]);

  const currentDeals = nearbyDeals.filter(deal => {
    const today = new Date();
    const expirationDate = new Date(deal.expirationDate);

    // Set both dates to start of the day for comparison
    today.setHours(0, 0, 0, 0);
    expirationDate.setHours(0, 0, 0, 0);

    return expirationDate >= today;
  });

  const filteredDeals = searchQuery
    ? currentDeals.filter(deal =>
      deal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.shopName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : currentDeals;

  return (
    <>
      <Head>
        <title>Lokal Offers - Find the Best Local Deals</title>
        <meta name="description" content="Discover amazing deals and offers near you with Lokal Offers. Save big on shopping, dining, and more." />
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center p-6 container mx-auto bg-gradient-to-r from-yellow-300 to-yellow-300">

        {/* First Row with Carousel */}
        <div className="w-full ">
          <h2 className="text-2xl font-bold text-center mb-2 dark:text-black">{heroTitle}</h2>
          <p className="text-lg text-center mb-4 dark:text-black">{heroDescription}</p>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false} // Hides the status
            showArrows={true} // Shows navigation arrows
            showIndicators={true} // Shows navigation indicators (bubbles)
            emulateTouch
            useKeyboardArrows
            swipeable
            dynamicHeight={false} // Adjust based on your content
            selectedItem={0} // Starts with the first item
            interval={5000} // Adjust the autoPlay interval as needed
          >
            {currentDeals.map((deal, index) => (
              <div key={index} className="focus:outline-none">
                <DealCard deal={deal} />
              </div>
            ))}
          </Carousel>
        </div>
        {/* Second Row */}
        <div className="w-full">
          <SearchBar onSearchChange={(query: any) => setSearchQuery(query)} />
        </div>
        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal, index) => <DealCard key={index} deal={deal} />)
          ) : (
            <p className="col-span-full">No deals available right now. Check back later!</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

