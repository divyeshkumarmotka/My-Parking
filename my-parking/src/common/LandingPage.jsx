import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const LandingPage = () => {
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

      {/* Hero Section */}
      <header className="flex items-center justify-center h-screen text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white relative">
        <div className="absolute inset-0 bg-opacity-40 bg-black"></div>
        <div className="relative z-10 px-6 md:px-12">
          <h1 className="text-6xl font-extrabold">Welcome to MyParking</h1>
          <p className="mt-6 text-xl">Find, book, and manage parking spaces effortlessly.</p>
          <Link to="/feature" className="mt-8 inline-block bg-white text-gray-900 px-8 py-4 text-lg rounded-full shadow-lg hover:bg-gray-300 transition duration-300">Explore Features</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto my-24 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">Why Choose My Parking?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white shadow-lg p-8 rounded-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold text-blue-600">Easy Booking</h3>
            <p className="mt-4 text-gray-600">Reserve your parking spot in advance with just a few clicks.</p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold text-blue-600">Real-Time Availability</h3>
            <p className="mt-4 text-gray-600">Check live parking spot availability anytime, anywhere.</p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold text-blue-600">Secure Payments</h3>
            <p className="mt-4 text-gray-600">Safe and hassle-free online payment options for convenience.</p>
          </div>
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Are You a Parking Provider?</h2>
          <p className="text-lg text-gray-600 mb-10">
            Join our growing network and list your parking spaces to earn effortlessly. Let’s make parking smarter together.
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/provider-login" className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              Provider Login
            </Link>
            <Link to="/provider-signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Become a Partner
            </Link>
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
  );
};

export default LandingPage;
