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
    "shopName": "HSR BDA Block Factory Outlets",
    "headline": "30% to 70% off on formal and semi-formal wear",
    "description": "Offers formal and semi-formal wear for men with discounts ranging from offers such as 30% to 70%, Buy One, Get One Free, and flat 70% discounts.",
    "expirationDate": "2024-03-31",
    "address": "HSR, Bengaluru",
    "lat": 12.9116,
    "lon": 77.6389
  },
  {
    "shopName": "Style Union",
    "headline": "₹200 Off for Your First Order",
    "description": "Style Union is the ultimate fashion destination in Mysore, offering distinctive seasonal collections for women, men, and kids. Specializing in an exquisite line of Indian fashion clothing, they cater to all occasions.",
    "expirationDate": "2024-03-31",
    "address": "Garuda Mall, Albert Victor Rd, Agrahara, Mandi Mohalla, Mysore, KA 570001",
    "lat": 12.3096,
    "lon": 76.6553
  },
  {
    "shopName": "Westside",
    "headline": "Exclusive offers with Club West card",
    "description": "Westside offers cutting-edge fashion and lifestyle brands for men, women, and children. Benefit from their Club West card, an exclusive rewards program designed for customers.",
    "expirationDate": "2024-03-31",
    "address": "No 560, New Kantharaj Urs Road, Next To Karnataka Bank, Kuvempunagara North, Saraswathipuram, Mysore, KA 570023",
    "lat": 12.3051,
    "lon": 76.6550
  },
  {
    "shopName": "Fashion Factory",
    "headline": "20-70% Discount on Best Brands",
    "description": "Fashion Factory is India’s leading chain of fashion discount stores offering 20-70% discounts. They cater to every fashion taste, from trendy western wear to elegant Indian looks.",
    "expirationDate": "2024-03-31",
    "address": "Fashion Factory, 7JWQ+6FJ, Ashoka Cir, Chamarajapura, Chamarajapuram Mohalla, Krishnamurthy Puram, Mysuru, Karnataka 570009",
    "lat": 12.2958,
    "lon": 76.6394
  },
  {
    shopName: "Reliance Fashion Factory",
    "headline": "Fashion 365 days - 20-70% Discount on Best Brands",
    "description": " Enjoy year-round shopping with exciting deals at Reliance Fashion Factory. Offering a range of trendy western wear to elegant Indian looks and everything in between. Shop your favourite brands for less",
    "expirationDate": "2024-03-31",
    "address": "nearest store in Bengaluru",
    "lat": 12.971599,
    "lon": 77.594566
  },
  {
    shopName: "Jayanagar Cloth Shop",
    "headline": "Save 50% at Jayanagar Cloth Shop",
    "description": "Jayanagar Cloth Shop offers a wide range of readymade garments suitable for any occasion without upsetting the budget. This offer allows you to save significantly on your purchases",
    "expirationDate": "2024-03-31",
    "address": "62, 10 Main Road, 4th Block, Jaya Nagar, Jaya Nagar, 4th T Block East, Jayanagar 3rd Block, Bangalore",
    "lat": 12.971599,
    "lon": 77.594566
  },
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
    shopName: "Central",
    "headline": "Happiness Sale: Up to 51% Discount",
    "description": "Enjoy up to 51% discount on over 200 brands plus additional shopping vouchers on purchases at Central stores in Bengaluru. Terms & Conditions apply.",
    "expirationDate": "2024-03-31",
    "address": "JP Nagar, Residency Road, Bengaluru",
    "lat": 12.971599,
    "lon": 77.594566
  },
  {
    shopName: "Unlimited",
    "headline": "Fashionable Ugadi Sale: Items Start at Rs.149",
    "description": "Celebrate Ugadi with fashionable offers from Unlimited Stores in Bengaluru. Laptop Bag at Rs.149 and more on qualifying purchases. 5% Instant Discount with SBI Card.",
    "expirationDate": "2024-03-31",
    "address": "Nearst Store",
    "lat": 12.971599,
    "lon": 77.594566
  },
  {
    shopName: "Lifestyle",
    "headline": "Sale: Boat Airdopes at Rs.949",
    "description": "Get Boat Airdopes at Rs.949 on shopping of Rs.5,000 at Lifestyle Stores in Bengaluru. Also, avail Timex smart watch at a special price on shopping of Rs.10,000.",
    "expirationDate": "2024-03-25",
    "address": "Adarsh Opus, Forum Shantiniketan, Gopalan Signature Mall, and more locations in Bengaluru",
    "lat": 12.971599,
    "lon": 77.594566
  },
  {
    shopName: 'Croma',
    headline: 'UNLIMITED 5% off on Windows laptops above ₹50,000 Show code: CCLLAP58H2',
    description: "Summer offers you just can't refuse! Use these special coupon code to get UNLIMITED 5% off on Windows laptops above ₹50,000",
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store',
    lat: 12.295810,
    lon: 76.639381
  },
  {
    shopName: 'Croma',
    headline: 'UNLIMITED 7% off on refrigerators Show code: CCLREF7N8I',
    description: "Summer offers you just can't refuse! Use these special coupon code to get UNLIMITED 7% off on refrigerators",
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store',
    lat: 12.295810,
    lon: 76.639381
  },
  {
    shopName: 'Croma',
    headline: 'UNLIMITED 7% off on 2 or more split ACs Show code: CCLAC7D31',
    description: "Summer offers you just can't refuse! Use these special coupon code to get UNLIMITED 7% off on 2 or more split ACs",
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store',
    lat: 12.295810,
    lon: 76.639381
  },
  {
    shopName: 'Croma',
    headline: 'UNLIMITED 5% off on 1 AC Show code: CCLAC54TK',
    description: "Summer offers you just can't refuse! Use these special coupon code to get UNLIMITED 5% off on 1 AC",
    expirationDate: '2024-03-31',
    address: 'Nearest Croma Store',
    lat: 12.295810,
    lon: 76.639381
  },
  {
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

