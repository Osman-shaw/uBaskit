import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import uBaskit from '../assets/uBaskit.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Handle mouse enter for tooltip
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  // Handle mouse leave for tooltip
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/service', label: 'Service' },
    { href: '/support', label: 'Support' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 border-b-2 border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" aria-label="uBaskit Home">
                <img
                  src={uBaskit}
                  className="h-15 w-auto rounded-full"
                  alt="uBaskit Logo"
                  loading="lazy"
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition duration-200"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <a
                  href="/login"
                  className="flex items-center px-4 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200"
                  aria-label="Login"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <AccountCircleIcon className="mr-2" />
                  Login
                </a>
                {showTooltip && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800 rounded-md shadow-lg z-10 whitespace-nowrap">
                    Sign in to your account
                  </div>
                )}
              </div>
              <a
                href="/signup"
                className="px-4 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600  rounded-full transition duration-200"
                aria-label="Register"
              >
                Register
              </a>
            </div>

            {/* Hamburger Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col space-y-2 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                  onClick={toggleMenu}
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
              <div className="relative">
                <a
                  href="/login"
                  className="flex items-center px-3 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200"
                  onClick={toggleMenu}
                  aria-label="Login"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <AccountCircleIcon className="mr-2" />
                </a>
                {showTooltip && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800  rounded-full  shadow-lg z-10 whitespace-nowrap">
                    Login to your account
                  </div>
                )}
              </div>
              <a
                href="/signup"
                className="px-3 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200"
                onClick={toggleMenu}
                aria-label="Register"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content overlap with fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;