import { NavLink } from "@features/root/core/types/navigation.type";
import { useState } from "react";

export function useNavigation() {
  const navLinks: NavLink[] = [
    { name: 'Movies', path: '/movies' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Categories', path: '/categories' },
    { name: 'New Releases', path: '/new' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return {
    navLinks,
    isMenuOpen,
    toggleMenu,
    closeMenu
  };
}