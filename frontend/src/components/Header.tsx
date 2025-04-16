import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaBell } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Movies', path: '/movies' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Categories', path: '/categories' },
    { name: 'New Releases', path: '/new' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tighter text-red-500">STREAMFLIX</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
              >
                <span className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-400 hover:text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <HiMenu size={24} />
        </button>

        {/* Mobile Navigation */}
        <div className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden fixed top-16 left-0 w-64 h-screen bg-black/95 border-r border-zinc-800 transition-transform duration-300 ease-in-out z-40`}>
          <ul className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-zinc-400 hover:text-white transition-colors block py-2"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input 
              type="search" 
              placeholder="Search..." 
              className="w-[200px] bg-zinc-900 pl-8 text-sm ring-offset-zinc-900 placeholder:text-zinc-500 focus-visible:ring-zinc-700 rounded-md px-3 py-2 border border-zinc-800"
            />
          </div>
          
          {/* Search for mobile */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FaSearch size={18} />
          </button>
          
          {isSearchOpen && (
            <div className="absolute right-4 top-16 mt-2 w-72 bg-black/95 rounded-md shadow-xl border border-zinc-800 md:hidden z-50">
              <div className="flex items-center p-3">
                <FaSearch size={16} className="text-zinc-500 mr-3" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-white text-sm placeholder-zinc-500 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
          )}
          
          {/* Notifications */}
          <button className="p-2 text-zinc-400 hover:text-white">
            <FaBell size={18} />
            <span className="sr-only">Notifications</span>
          </button>
          
          {/* Profile */}
          <div className="relative group">
            <button className="p-2 text-zinc-400 hover:text-white">
              <FaUserCircle size={18} />
              <span className="sr-only">Profile</span>
            </button>
            <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-56 bg-black/95 rounded-md shadow-xl border border-zinc-800">
              <div className="py-2">
                <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white">
                  Profile
                </Link>
                <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white">
                  Settings
                </Link>
                <hr className="my-1 border-zinc-800" />
                <button className="w-full text-left px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 