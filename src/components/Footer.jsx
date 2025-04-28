// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-800 text-gray-300 py-8">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <div className="text-lg font-semibold text-white mb-4">
        Gravity Nonprofit
      </div>

      {/* Footer Links */}
      <div className="flex justify-center space-x-6 text-sm mb-6">
        <a href="#home" className="hover:text-white transition duration-200">Home</a>
        <a href="#about" className="hover:text-white transition duration-200">About</a>
        <a href="#events" className="hover:text-white transition duration-200">Events</a>
        <a href="#contact" className="hover:text-white transition duration-200">Contact</a>
      </div>

      {/* Instagram Icon and Contact Info */}
      <div className="flex justify-center mb-4">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 text-3xl" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      
      <div className="text-sm text-gray-400 mb-6">
        <p>Email: gravityitdrawsyouin@gmail.com</p>
      </div>

      {/* Staff Login Button */}
      <div className="mt-4">
        <Link to="/staff-login" className="text-sm text-gray-400 hover:text-white transition duration-200">
          Staff Login
        </Link>
      </div>

      <div className="text-center text-gray-500 text-xs mt-4">
        &copy; {new Date().getFullYear()} Gravity Nonprofit. All rights reserved.
      </div>
    </div>
    </footer>
  );
};

export default Footer;
