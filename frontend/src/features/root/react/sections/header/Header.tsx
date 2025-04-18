import React, { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaBell } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { useNavigation } from '@features/root/react/hooks/use-navigation';
import { useSearch } from '@features/root/react/hooks/use-search';
import { useUserProfile } from '@features/root/react/hooks/use-user-profile';
import { MobileMenu } from '@features/root/react/sections/header/mobile/MobileMenu';
import { SearchBar } from '@features/root/react/sections/header/SearchBar';
import { MobileSearchOverlay } from '@features/root/react/sections/header/mobile/MobileSearchOverlay';
import { ProfileMenu } from '@features/root/react/sections/header/ProfileMenu';
import { NavBar } from '@features/root/react/sections/header/NavBar';

const Header: React.FC = () => {
  const { navLinks, isMenuOpen, toggleMenu, closeMenu } = useNavigation();
  const { isSearchOpen, handleSearch, toggleSearch, searchInputRef } = useSearch();
  const { showProfileMenu, toggleProfileMenu, handleSignOut } = useUserProfile();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between px-4 m-auto md:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tighter text-red-500">FREEFLIX</span>
          </Link>
          
          {/* Desktop navigation */}
          <NavBar navLinks={navLinks} />
        </div>
        
        {/* Mobile menu */}
        <button
          className="md:hidden text-zinc-400 hover:text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          data-testid="mobile-menu-button"
        >
          <HiMenu size={24} />
        </button>

        {/* Composant menu mobile */}
        <MobileMenu 
          isOpen={isMenuOpen} 
          navLinks={navLinks} 
          onLinkClick={closeMenu} 
        />

        <div className="flex items-center gap-4">
          {/* Desktop search bar */}
          <div className="relative hidden md:block">
            <SearchBar 
              onSearch={handleSearch} 
              className="w-[250px]" 
            />
          </div>
          
          {/* Mobile search button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={toggleSearch}
            aria-label="Search"
            aria-expanded={isSearchOpen}
            data-testid="mobile-search-button"
          >
            <FaSearch size={18} />
          </button>
          
          {/* Overlay recherche mobile */}
          <MobileSearchOverlay 
            isOpen={isSearchOpen} 
            onSearch={handleSearch} 
            inputRef={searchInputRef as RefObject<HTMLInputElement>}
          />
          
          {/* Notifications */}
          <button 
            className="p-2 text-zinc-400 hover:text-white"
            aria-label="Notifications"
          >
            <FaBell size={18} />
          </button>
          
          {/* Profile */}
          <div className="relative">
            <button 
              className="p-2 text-zinc-400 hover:text-white"
              onClick={toggleProfileMenu}
              aria-label="Profile"
              aria-expanded={showProfileMenu}
              data-testid="profile-button"
            >
              <FaUserCircle size={18} />
            </button>
            
            {/* Menu profil */}
            <ProfileMenu 
              isOpen={showProfileMenu} 
              onSignOut={handleSignOut} 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;