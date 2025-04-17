import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from '@features/root/core/types/navigation.type';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  onLinkClick: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navLinks, onLinkClick }) => {
  return (
    <div 
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:hidden fixed top-16 left-0 w-64 h-screen bg-black/95 border-r border-zinc-800 transition-transform duration-300 ease-in-out z-40`}
      data-testid="mobile-menu"
    >
      <ul className="flex flex-col p-6 space-y-4">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-zinc-400 hover:text-white transition-colors block py-2"
              onClick={onLinkClick}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};