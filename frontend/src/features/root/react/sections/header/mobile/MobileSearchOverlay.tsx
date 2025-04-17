import React, { RefObject } from 'react';
import { FaSearch } from 'react-icons/fa';

interface MobileSearchOverlayProps {
  isOpen: boolean;
  onSearch: (query: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const MobileSearchOverlay: React.FC<MobileSearchOverlayProps> = ({ 
  isOpen, 
  onSearch,
  inputRef
}) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="absolute right-4 top-16 mt-2 w-72 bg-black/95 rounded-md shadow-xl border border-zinc-800 md:hidden z-50"
      data-testid="mobile-search-overlay"
    >
      <div className="flex items-center p-3">
        <FaSearch size={16} className="text-zinc-500 mr-3" />
        <input
          ref={inputRef as RefObject<HTMLInputElement>}
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent text-white text-sm placeholder:text-zinc-500 focus:outline-none"
          onChange={(e) => onSearch(e.target.value)}
          autoFocus
        />
      </div>
    </div>
  );
};