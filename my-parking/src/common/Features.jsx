import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaLock, FaCar, FaWallet, FaHeadset } from "react-icons/fa";

export const Features = () => {
      const [menuOpen, setMenuOpen] = useState(false);
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

      

      {/* Features Section */}
      <section className="bg-gray-900 text-gray-300 py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl leading-tight">
            Smart. Secure. Seamless.
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Experience the next level of hassle-free parking with cutting-edge technology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaClock size={30} className="text-blue-500" />} 
            title="Instant Booking & Reservation" 
            description="Find, book, and secure your parking space in seconds with real-time availability." 
          />
          <FeatureCard 
            icon={<FaMapMarkerAlt size={30} className="text-blue-500" />} 
            title="Live Location Tracking" 
            description="Easily navigate to your reserved parking spot with precise GPS guidance." 
          />
          <FeatureCard 
            icon={<FaLock size={30} className="text-blue-500" />} 
            title="Secure & Verified Parking" 
            description="Park with confidence in monitored and security-enabled parking spaces." 
          />
          <FeatureCard 
            icon={<FaCar size={30} className="text-blue-500" />} 
            title="Multiple Vehicle Support" 
            description="Seamlessly book parking for cars, bikes, or electric vehicles with customized pricing." 
          />
          <FeatureCard 
            icon={<FaWallet size={30} className="text-blue-500" />} 
            title="Cashless & Contactless Payment" 
            description="Pay securely using digital wallets, UPI, and cards for a hassle-free experience." 
          />
          <FeatureCard 
            icon={<FaHeadset size={30} className="text-blue-500" />} 
            title="24/7 Customer Support" 
            description="Our dedicated support team is always available to assist you anytime, anywhere." 
          />
        </div>
      </div>
    </section>

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
  )
}

const FeatureCard = ({ icon, title, description }) => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <div className="flex items-center space-x-4">
          {icon}
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="mt-3 text-gray-400">{description}</p>
      </div>
    );
  };