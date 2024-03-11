import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <header className="bg-black">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link href="/">
                    <div className="flex items-center cursor-pointer">
                        <span className="font-bold text-xl text-white ml-2">Lokal Offers</span>
                    </div>
                </Link>
                <div className="hidden md:flex items-center space-x-1">
                    <Link href="/deals" className="py-2 px-4 text-white hover:bg-yellow-500 transition duration-300">
                    </Link>
                    {/* Other navigation links */}
                </div>
                <div className="md:hidden">
                    {/* Mobile menu button */}
                    <button className="text-white focus:outline-none">
                        {/* Icon for menu */}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
