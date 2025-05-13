import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CallPage from './pages/CallPage';
import StatsPage from './pages/StatsPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [activePage, setActivePage] = useState<'call' | 'stats'>('call');

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      
      <main className="container mx-auto py-8 px-4 md:px-0">
        {activePage === 'call' ? <CallPage /> : <StatsPage />}
      </main>
    </div>
  );
}

export default App;