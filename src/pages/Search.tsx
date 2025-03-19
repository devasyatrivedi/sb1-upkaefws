import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search businesses..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <SearchIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
          Search
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Enter a search term to find businesses</p>
      </div>
    </div>
  );
}