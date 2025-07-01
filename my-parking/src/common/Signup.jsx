import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import api from "../api"; // Adjust the import path if needed
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export const Signup = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/register", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role )
      navigate("/user");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-gray-100 overflow-hidden">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white fixed top-0 w-full shadow-lg py-3 px-6 z-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link className="text-2xl font-extrabold tracking-wide" to="/">MyParking</Link>
            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 text-lg">
              <li><Link className="hover:text-blue-400 transition duration-300" to="/aboutus">About</Link></li>
              <li><Link className="hover:text-blue-400 transition duration-300" to="/feature">Features</Link></li>
              <li><Link className="hover:text-blue-400 transition duration-300" to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300" to="/login">Login</Link>
            <Link className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300" to="/signup">Register</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-800 text-white py-4 px-6 absolute top-16 w-full flex flex-col space-y-4">
            <Link className="hover:text-blue-400 transition duration-300" to="" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link className="hover:text-blue-400 transition duration-300" to="#about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link className="hover:text-blue-400 transition duration-300" to="#features" onClick={() => setMenuOpen(false)}>Features</Link>
            <Link className="hover:text-blue-400 transition duration-300" to="#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 text-center" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-center" to="/signup" onClick={() => setMenuOpen(false)}>Register</Link>
          </div>
        )}
      </nav>

      <div className="flex items-center justify-center mt-16 pt-8 bg-gray-900 min-h-screen">
        <div className="w-80 p-5 bg-gray-800 text-white rounded-xl shadow-lg">
          <h2 className="text-center text-xl font-semibold">Sign Up</h2>
          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          <form className="space-y-3 mt-3" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name" 
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" 
              required
            />
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" 
              required
            />
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Mobile Number" 
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" 
            />
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password" 
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" 
              required
            />
            <button 
              type="submit" 
              className="w-full p-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold text-base"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Branding */}
                <div>
                  <h2 className="text-xl font-semibold text-white">My Parking</h2>
                  <p className="text-sm text-gray-400 mt-2">
                    Your seamless parking solution. Book your spot hassle-free anytime, anywhere.
                  </p>
                </div>
      
                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                  <ul className="mt-2 space-y-2">
                    <li><Link to="/aboutus" className="hover:text-white transition">About Us</Link></li>
                    <li><Link to="/feature" className="hover:text-white transition">features</Link></li>
                    <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                  </ul>
                </div>
      
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                  <p className="mt-2 text-sm text-gray-400">123 Parking Street, City, Country</p>
                  <p className="text-sm text-gray-400">Email: support@myparking.com</p>
                  <p className="text-sm text-gray-400">Phone: +123 456 7890</p>
                </div>
      
                {/* Social Media */}
                <div>
                  <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                  <div className="flex space-x-4 mt-3">
                    <Link to="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                      <FaFacebookF className="text-white text-lg" />
                    </Link>
                    <Link to="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                      <FaTwitter className="text-white text-lg" />
                    </Link>
                    <Link to="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                      <FaInstagram className="text-white text-lg" />
                    </Link>
                    <Link to="#" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                      <FaLinkedinIn className="text-white text-lg" />
                    </Link>
                  </div>
                </div>
              </div>
      
              {/* Divider */}
              <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                <p className="text-sm text-gray-400">
                  &copy; {new Date().getFullYear()} My Parking. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
    </div>
  );
};

