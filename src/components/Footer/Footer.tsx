import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-400 mt-auto py-4">
            <div className="container mx-auto px-6 text-block text-center">
                <p>© {new Date().getFullYear()} Lokal Offers. All rights reserved.</p>
                {/* Additional footer content */}
            </div>
        </footer>
    );
};

export default Footer;
