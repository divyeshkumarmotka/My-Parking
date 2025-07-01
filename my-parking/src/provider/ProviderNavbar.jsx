import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const ProviderNavbar = () => {
  const logout = () => {
    localStorage.clear();
  };

  const [locationOpen, setLocationOpen] = useState(false);
  const [insightOpen, setInsightOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center relative gap-8">
          {/* Brand */}
          <Link to="/provider">
            <h1 className="text-xl font-bold">My Parking (Provider)</h1>
          </Link>

          {/* Manage Locations */}
          <div className="relative">
            <button
              onClick={() => setLocationOpen((prev) => !prev)}
              className="hover:text-blue-400 flex items-center"
            >
              Manage Locations
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {locationOpen && (
              <ul className="absolute mt-8 w-52 bg-gray-700 rounded shadow-lg z-10">
                <li>
                  <Link to="add-parking" className="block px-4 py-2 hover:bg-gray-600">
                    Add Parking Location
                  </Link>
                </li>
                <li>
                  <Link to="my-locations" className="block px-4 py-2 hover:bg-gray-600">
                    My Locations
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Booking Insights */}
          <div className="relative mr-84">
            <button
              onClick={() => setInsightOpen((prev) => !prev)}
              className="hover:text-blue-400 flex items-center"
            >
              Bookings
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {insightOpen && (
              <ul className="absolute mt-8 w-52 bg-gray-700 rounded shadow-lg z-10">
                <li>
                  <Link to="current-bookings" className="block px-4 py-2 hover:bg-gray-600">
                    Current Bookings
                  </Link>
                </li>
                <li>
                  <Link to="booking-history" className="block px-4 py-2 hover:bg-gray-600">
                    Booking History
                  </Link>
                </li>
                <li>
                  <Link to="analytics" className="block px-4 py-2 hover:bg-gray-600">
                    Analytics
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="hover:text-blue-400 flex items-center"
            >
              Profile
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {profileOpen && (
              <ul className="absolute mt-8 w-52 bg-gray-700 rounded shadow-lg z-10">
                <li>
                  <Link to="provider-profile" className="block px-4 py-2 hover:bg-gray-600">
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link to="edit-profile" className="block px-4 py-2 hover:bg-gray-600">
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link to="change-password" className="block px-4 py-2 hover:bg-gray-600">
                    Change Password
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Logout */}
          <Link to="/login" onClick={logout} className="ml-auto hover:text-red-400">
            Logout
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
};
