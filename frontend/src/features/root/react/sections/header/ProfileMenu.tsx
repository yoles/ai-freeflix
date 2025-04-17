import React from 'react';
import { Link } from 'react-router-dom';

interface ProfileMenuProps {
  isOpen: boolean;
  onSignOut: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ isOpen, onSignOut }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="absolute right-0 top-full mt-2 w-56 bg-black/95 rounded-md shadow-xl border border-zinc-800"
      data-testid="profile-menu"
    >
      <div className="py-2">
        <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white">
          Profile
        </Link>
        <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white">
          Settings
        </Link>
        <hr className="my-1 border-zinc-800" />
        <button 
          className="w-full text-left px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
          onClick={onSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};