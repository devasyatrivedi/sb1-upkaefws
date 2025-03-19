import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Store, Home, PlusCircle, LogIn, Newspaper } from 'lucide-react';

export default function Navbar() {
  const { user, isBusinessOwner, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Store className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl">Marketplace</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link to="/marketplace" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
                <Store className="h-5 w-5" />
                <span>Marketplace</span>
              </Link>
              <Link to="/search" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Link>
              <Link to="/news" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
                <Newspaper className="h-5 w-5" />
                <span>News</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {isBusinessOwner && (
                  <Link 
                    to="/add-listing"
                    className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    <PlusCircle className="h-5 w-5" />
                    <span>Add Listing</span>
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/user-login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <LogIn className="h-5 w-5" />
                  <span>User Login</span>
                </Link>
                <Link 
                  to="/business-login"
                  className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  <Store className="h-5 w-5" />
                  <span>Business Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}