import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-10 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
            Elevate Objective Task
        </Link>
      </div>
    </header>
  );
};

export default Header;