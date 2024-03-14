// SearchBar.tsx
import React from 'react';

interface SearchBarProps {
    onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
    return (
        <div className="mt-8 relative">
            <input
                type="text"
                placeholder="Search deals..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-md"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'%2378797d\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z\' clip-rule=\'evenodd\'/%3E%3C/svg%3E")',
                    backgroundPosition: '0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.25rem 1.25rem'
                }}
            />
        </div>
    );
};

export default SearchBar;
