import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search...', 
  className = '',
  inputRef
}) => {
  return (
    <div className={`relative ${className}`}>
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
      <input 
        ref={inputRef}
        type="search" 
        placeholder={placeholder} 
        className="w-full bg-zinc-900/80 border-zinc-700 pl-9 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 rounded-full px-4 py-2"
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search"
      />
    </div>
  );
};