import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api"; 

const ProviderProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch profile using token in URL
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }
      try {
        // Using the token in the URL
        const res = await api.get(`/auth/profile?token=${token}`);
        
        setUser(res.data);
      } catch (err) {
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="max-w-lg mx-auto text-center mt-20">
        {error ? <p className="text-red-500">{error}</p> : <p>Loading profile...</p>}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md border border-gray-200 p-6 rounded-lg mx-[100px] mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Profile</h2>

      {/* Profile Details */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FaUserCircle className="text-gray-600 text-lg" />
          <p className="text-gray-800 font-medium">{user.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-gray-600 text-lg" />
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div className="flex items-center space-x-3">
          <FaPhone className="text-gray-600 text-lg" />
          <p className="text-gray-800">{user.phone}</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <Link to='/provider/edit-profile'>
        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-500 transition-all">
          Edit Profile
        </button>
      </Link>
    </div>
  );
};

export default ProviderProfile;
