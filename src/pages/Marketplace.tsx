import React from 'react';

export default function Marketplace() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder for listings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">Loading listings...</p>
        </div>
      </div>
    </div>
  );
}