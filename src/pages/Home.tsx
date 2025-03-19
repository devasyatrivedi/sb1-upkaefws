import React from 'react';
import { Store } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-12">
        <Store className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Business Marketplace</h1>
        <p className="text-xl text-gray-600 mb-8">Discover and connect with businesses in your area</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">For Businesses</h2>
            <p className="text-gray-600">List your business and reach more customers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">For Customers</h2>
            <p className="text-gray-600">Find the best local businesses and services</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Easy Connection</h2>
            <p className="text-gray-600">Simple platform to connect businesses and customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}