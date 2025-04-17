import { useState } from 'react';

export function useUserProfile() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const toggleProfileMenu = () => setShowProfileMenu(prev => !prev);
  
  const handleSignOut = () => {
    console.log('User signing out');
  };

  return {
    showProfileMenu,
    toggleProfileMenu,
    handleSignOut
  };
}