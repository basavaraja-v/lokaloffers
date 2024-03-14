import React from 'react';

interface DealCardProps {
    deal: {
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
        <div className="border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow block p-4">
            <h3 className="text-2xl font-bold mb-1 dark:text-black">{deal.shopName}</h3>
            <p className="font-semibold text-indigo-600 mb-2">{deal.headline}</p>
            <p className="text-gray-700 text-sm mb-2">{deal.description}</p>
            <p className="text-gray-700 text-sm mb-2">Address: {deal.address}</p>
            <p className='text-sm text-red-500'>
                Expires on {deal.expirationDate.split('-').reverse().join('-')}
            </p>
        </div >
    );
};

export default DealCard;
