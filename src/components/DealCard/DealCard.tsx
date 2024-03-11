import React from 'react';
import Link from 'next/link';

interface DealCardProps {
    deal: {
        id: string;
        shopName: string;
        headline: string;
        description: string;
        expirationDate: string;
        address: string;
    };
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
    const isExpiringSoon = () => {
        const today = new Date();
        const expDate = new Date(deal.expirationDate);
        const diffTime = Math.abs(expDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 1; // Adjust according to what you consider "soon"
    };

    return (
        <div className="border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <Link href={`/deals/${deal.id}`} className="block p-4">
                <h3 className="text-2xl font-bold mb-1">{deal.shopName}</h3>
                <p className="font-semibold text-indigo-600 mb-2">{deal.headline}</p>
                <p className="text-gray-700 text-sm mb-2">{deal.description}</p>
                <p className="text-gray-700 text-sm mb-2">Address: {deal.address}</p>
                <p className='text-sm text-red-500'>Expires on {deal.expirationDate}</p>
            </Link>
        </div>
    );
};

export default DealCard;
