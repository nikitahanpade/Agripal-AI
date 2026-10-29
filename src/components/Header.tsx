import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sprout, Menu, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useUser();  // ✅ context मधून user & logout घेतलं

  const handleLogout = () => {
    logout();
    navigate("/"); // logout झाल्यावर home वर redirect
  };

  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">
              AgriPal <span className="text-green-600">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                location.pathname === '/' ? 'text-green-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>

            {!user ? (
              // User नसल्यास Register दिसेल
              <Link
                to="/register"
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  location.pathname === '/register' ? 'text-green-600' : 'text-gray-700'
                }`}
              >
                Get Started
              </Link>
            ) : (
              // User लॉगिन असेल तर Name + Logout दिसेल
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-sm font-medium text-gray-700 hover:text-green-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {!user ? (
                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-700 hover:text-green-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              ) : (
                <>
                  <span className="text-sm font-medium text-gray-700 py-2">
                    Hi, {user.name}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm font-medium text-red-600 hover:text-red-700 py-2 text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
