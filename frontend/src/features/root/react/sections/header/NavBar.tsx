import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from '@features/root/core/types/navigation.type';

interface NavBarProps {
  navLinks: NavLink[];
}

export const NavBar: React.FC<NavBarProps> = ({ navLinks }) => {
  return (
    <nav className="hidden md:flex gap-6" data-testid="desktop-nav">
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
  );
};