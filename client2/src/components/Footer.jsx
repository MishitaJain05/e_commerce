import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-3 mt-3">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-10">
        {/* Brand aligned left */}
        <div className="flex justify-start items-center gap-3">
          <span className="text-3xl font-bold text-white">ShopEase</span>
        </div>

        {/* Links aligned right */}
        <div className="flex flex-wrap gap-6 mt-3 md:mt-0 md:mb-0 items-center">
          <a
            href="/"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="/products"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Products
          </a>
          <a
            href="/about"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        <div className="mt-3 text-center text-gray-500 text-sm mb-1">
          &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
