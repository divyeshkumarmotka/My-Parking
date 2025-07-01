import React, { useState } from 'react';
import { SearchResults } from './Searchresults';
import { useLocation } from 'react-router-dom';
import api from "../../api";

export const Findparking = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  
  const location = useLocation();
  
  // Handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      // Call the search endpoint with query parameter and token in URL
      const response = await api.get(`parkingLocations/searchparking?q=${encodeURIComponent(searchQuery)}&token=${token}`);
      setSearchResults(response.data);
      setShowResults(true);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching search results");
      setShowResults(false);
    }
  };

  return (
    <div className={`${location.pathname === "/user/find-parking" ? "pt-6" : ""}`}>
      {/* Find Parking Form */}
      <div className="bg-white rounded-xl shadow-md border mx-[100px] border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Find Parking</h2>
        <form className="space-y-5" onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Location</label>
              <input
                type="text"
                placeholder="Enter address, city, or landmark"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
            </div>
            {/* Date */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Date</label>
              <input
                type="date"
                defaultValue="2025-03-24"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
            </div>
            {/* Start Time */}
            {/* <div>
              <label className="block text-sm text-gray-600 mb-2">Start Time</label>
              <input
                type="time"
                defaultValue="16:46"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
            </div> */}
            {/* End Time */}
            {/* <div>
              <label className="block text-sm text-gray-600 mb-2">End Time</label>
              <input
                type="time"
                defaultValue="17:46"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
            </div> */}
          </div>
          <button
            type="submit"
            className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-500 transition-all"
          >
            Search Available Spots
          </button>
        </form>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Conditionally Render Search Results */}
      {showResults && <SearchResults results={searchResults} />}
    </div>
  );
};
