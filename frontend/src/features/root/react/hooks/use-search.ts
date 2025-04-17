import { useState, useRef, useEffect } from 'react';

export function useSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Searching for: ${query}`);
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return {
    isSearchOpen,
    searchQuery,
    toggleSearch,
    handleSearch,
    searchInputRef
  };
}