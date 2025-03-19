import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Search from './pages/Search';
import News from './pages/News';
import UserLogin from './pages/UserLogin';
import BusinessLogin from './pages/BusinessLogin';
import AddListing from './pages/AddListing';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/search" element={<Search />} />
              <Route path="/news" element={<News />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/business-login" element={<BusinessLogin />} />
              <Route path="/add-listing" element={<AddListing />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App