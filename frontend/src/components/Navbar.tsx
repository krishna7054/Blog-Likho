
import  { useState } from 'react';
import {  CiSearch, CiUser, CiLogout } from 'react-icons/ci';
// import {FaBookOpen} from 'react-icons/fa';
import {MdOutlineCancel} from 'react-icons/md';
import { Link } from "react-router-dom"
import Logo from './logo';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
          <Link to={'/blogs'} className='flex items-center'>
            {/* <FaBookOpen className="h-8 w-8 text-indigo-600" /> */}
            <Logo/>
            <span className="ml-2 text-xl font-bold text-gray-900 italic">Blog <span className='text-red-500'>लिखो</span> </span>
          </Link>
          </div>
          {/* Navigation Links - Hidden on mobile */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Home
            </a>
            <a href="/articles" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Articles
            </a>
            <a href="/categories" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Categories
            </a>
            <a href="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">
              About
            </a>
          </div> */}

          {/* Right Side Icons and Search */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {isSearchOpen ? <MdOutlineCancel className="h-5 w-5" /> : <CiSearch className="h-5 w-5" />}
              </button>
              
              {/* Search Overlay */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 px-3">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <CiSearch className="h-4 w-4 text-gray-400 ml-2" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full py-2 px-3 text-gray-700 focus:outline-none"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <CiUser className="h-5 w-5" />
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                  <a 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a 
                    href="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <button 
                    onClick={() => console.log('Logout clicked')}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <CiLogout className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            {/* <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <CiMenuBurger className="h-5 w-5" />
            </button> */}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {/* {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">
              Home
            </a>
            <a href="/articles" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">
              Articles
            </a>
            <a href="/categories" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">
              Categories
            </a>
            <a href="/about" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">
              About
            </a>
          </div>
        </div>
      )} */}

      {/* Click Outside Handler */}
      {(isSearchOpen || isProfileOpen) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setIsSearchOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;