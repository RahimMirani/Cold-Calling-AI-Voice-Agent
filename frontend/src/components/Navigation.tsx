import React from 'react';
import { Phone, BarChart } from 'lucide-react';

interface NavigationProps {
  activePage: 'call' | 'stats';
  setActivePage: (page: 'call' | 'stats') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto">
        <div className="flex">
          <button
            onClick={() => setActivePage('call')}
            className={`flex items-center px-6 py-4 transition-colors duration-200 ${
              activePage === 'call'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <Phone size={20} className="mr-2" />
            Call Setup
          </button>
          <button
            onClick={() => setActivePage('stats')}
            className={`flex items-center px-6 py-4 transition-colors duration-200 ${
              activePage === 'stats'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <BarChart size={20} className="mr-2" />
            Statistics & Records
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;