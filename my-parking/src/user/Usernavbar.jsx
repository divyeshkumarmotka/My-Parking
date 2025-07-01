import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

export const Usernavbar = () => {

    const logout = () => {
        localStorage.clear();
    }

    const [insight, setinsight] = useState(false)
    const [parkingOpen, setParkingOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleinsight = ()=> setinsight(prev => !prev)
    const toggleParking = () => setParkingOpen(prev => !prev);
    const toggleProfile = () => setProfileOpen((prev) => !prev);

  return (
    <>
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center relative">
          {/* Brand */}
         <Link to="/user"><h1 className="text-xl font-bold mr-6">My Parking</h1></Link> 
          
          {/* Dashboard Dropdown */}
          <div className="relative">
           <Link to='find-parking'> <button
              className="hover:text-blue-400 focus:outline-none flex items-center mr-4"
            >
              find-parking
            </button>
            </Link>
          </div> 

          {/* Parking Locations Dropdown */}
          <div className="relative">
            <button
              onClick={toggleinsight}
              className="hover:text-blue-400 focus:outline-none flex items-center mr-4"
            >
              Parkign Insights
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {insight && (
              <ul className="absolute right-0 mt-8 w-48 bg-gray-700 rounded shadow-lg z-10">
                <li>
                  <Link
                    to="parking-history"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Parking History
                  </Link>
                </li>
                <li>
                  <Link
                    to="payment-history"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Payment History
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Parking Locations Dropdown */}
          <div className="relative">
            <button
              onClick={toggleParking}
              className="hover:text-blue-400 focus:outline-none flex items-center mr-75"
            >
              Parking Locations
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {parkingOpen && (
              <ul className="absolute right-0 mt-8 w-48 bg-gray-700 rounded shadow-lg z-10">
                <li>
                  <Link
                    to="nearby-location"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Nearby Parking Lots
                  </Link>
                </li>
                <li>
                  <Link
                    to="saved-location"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Saved Locations
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="hover:text-blue-400 focus:outline-none flex items-center mr-4"
            >
              User Profile
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {profileOpen && (
              <ul className="absolute right-0 mt-8 w-48 bg-gray-700 rounded shadow-lg z-10">
                <li>
                  <Link
                    to="user-profile"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="edit-profile"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="change-password"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Change Password
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Logout Link */}
          <Link onClick={logout} to="/login" className="hover:text-red-400">
            Logout
          </Link>
        </div>
      </nav>
      
        <Outlet />
     
    </>
  )
}
