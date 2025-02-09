
import  { useEffect, useState } from 'react';
import {  CiSearch, CiUser, CiLogout } from 'react-icons/ci';
// import {FaBookOpen} from 'react-icons/fa';
import {MdOutlineCancel} from 'react-icons/md';
import { Link, useLocation, useNavigate } from "react-router-dom"
import Logo from './Logo';
// import { useUsers } from '../hooks';
import { jwtDecode } from 'jwt-decode';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { Avatar } from './BlogCard';

const Navbar = ({ onPublish }: { onPublish?: () => void }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
 

 const navigate = useNavigate();
 const location = useLocation(); 
 const [Users, setUsers] = useState<{ name?: string; email?: string } | null>(null);

 useEffect(() => {
  const token = localStorage.getItem("token");
  // console.log("t",token)
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.id;
    try {
      axios.get(`${BACKEND_URL}/api/v1/user/${userId}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      console.log("res",response.data);
      
      setUsers(response.data); // Store as an array
      // setLoading(false);
    })
    } catch (error) {
      console.error("Invalid token");
    }
  }
}, []);
 const removeUserToken = () => {
  localStorage.removeItem('token');
};

const logout = () => {
  removeUserToken();
  navigate('/signin')
  
  console.log('User logged out');
};


  return (
    <nav className="bg-white shadow-md fixed z-10 w-full ">
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
          {/* <Link to={`/publish`}>  
<button
  title="Add New"
  className="group cursor-pointer outline-none hover:rotate-90 duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    className="stroke-slate-400 fill-none group-hover:fill-slate-800 group-active:stroke-slate-200 group-active:fill-slate-600 group-active:duration-0 duration-300"
  >
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke-width="1.5"
    ></path>
    <path d="M8 12H16" stroke-width="1.5"></path>
    <path d="M12 16V8" stroke-width="1.5"></path>
  </svg>
</button>
</Link>  */}


{location.pathname === "/publish" ? ( // Check if on the /publish page
              <button
                title="Publish"
                onClick={onPublish} 
                className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
              >
                Publish
              </button>
            ) : (
              <Link to={`/publish`}>
                <button
                  title="Add New"
                  className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    className="stroke-slate-400 fill-none group-hover:fill-slate-800 group-active:stroke-slate-200 group-active:fill-slate-600 group-active:duration-0 duration-300"
                  >
                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5"></path>
                    <path d="M8 12H16" strokeWidth="1.5"></path>
                    <path d="M12 16V8" strokeWidth="1.5"></path>
                  </svg>
                </button>
              </Link>
            )}

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
                  {/* <CiUser className="h-5 w-5" /> */}
                   <Avatar name={Users?.name || 'Null'} />
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                   
                  
                      
                        <p className="text-sm font-medium text-gray-900">{Users?.name}</p>
                        <p className="text-sm text-gray-500">{Users?.email}</p>
                      
                    
                  </div>

                  
                  <a 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center cursor-pointer"
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