import React, { useContext, useEffect, useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { IoBagAdd } from "react-icons/io5";
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { SearchContext } from './SearchContext';
import { CartContext } from './CartContext';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { totalItems } = useContext(CartContext);

  // Auto-show profile dropdown after 20s on homepage
  useEffect(() => {
    const timer = setTimeout(() => setShowProfile(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header className="bg-purple-500 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 relative">
          {/* Logo */}
          <div className="h-[9vh] w-[70px]">
            <img
              src="https://thumbs.dreamstime.com/b/realistic-d-icon-purple-shopping-pushcart-purchase-transportation-delivery-service-vector-realistic-d-icon-purple-shopping-244248238.jpg"
              className="rounded-full h-[10vh] w-[70px]"
              alt="logo"
            />
          </div>

          {/* Desktop Search */}
          <div className="hidden sm:flex flex-grow mx-4 max-w-xl bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
            <FiSearch className="text-gray-500 text-xl mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..."
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-8 text-white relative">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="hover:text-gray-300 text-2xl"
            >
              <FaUserAlt />
            </button>

            <Link to="/cart" className="relative hover:text-gray-300 text-2xl">
              <IoBagAdd />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden ml-4 text-2xl focus:outline-none">
              <CiMenuBurger />
            </button>
          </div>

          {/* Profile Dropdown */}
          {showProfile && <ProfileDropdown onClose={() => setShowProfile(false)} />}
        </div>

        {/* Mobile Search Input */}
        <div className="sm:hidden px-4 pb-3">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
            <FiSearch className="text-gray-500 text-xl mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..."
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-gray-200">
          <div className="hidden sm:flex items-center justify-center h-12 space-x-15">
            <Link to="/" className="text-purple-600 hover:underline">HOME</Link>
            <Link to="/men" className="text-purple-600 hover:underline">MEN</Link>
            <Link to="/women" className="text-purple-600 hover:underline">WOMEN</Link>
            <Link to="/kids" className="text-purple-600 hover:underline">KIDS</Link>
            <Link to="/contact" className="text-purple-600 hover:underline">CONTACT US</Link>
          </div>

          {isOpen && (
            <div className="sm:hidden bg-gray-100 px-4 pb-4 space-y-2">
              <Link to="/" className="block text-purple-700 hover:underline">HOME</Link>
              <Link to="/men" className="block text-purple-700 hover:underline">MEN</Link>
              <Link to="/women" className="block text-purple-700 hover:underline">WOMEN</Link>
              <Link to="/kids" className="block text-purple-700 hover:underline">KIDS</Link>
              <Link to="/contact" className="block text-purple-700 hover:underline">CONTACT</Link>
            </div>
          )}
        </nav>
      </header>

      {/* Spacer */}
      <div className="h-[10vh] sm:h-[12vh]"></div>
    </>
  );
};

export default Navbar;
