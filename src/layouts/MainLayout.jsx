import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ScrollToTop from '../components/common/ScrollToTop';

const MainLayout = ({ children, showFooter = true, activeTab, setActiveTab, setActivePage }) => {
  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col">
      <ScrollToTop />
      
      {/* Header stays at the top */}
      <Header 
        setActivePage={setActivePage} 
        setActiveTab={setActiveTab} 
        activeTab={activeTab} 
      />
      
      {/* Main content that will push the footer down */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      
      {/* Footer will always be at the bottom */}
      {showFooter && (
        <footer className="w-full mt-auto">
          <Footer 
            setActivePage={setActivePage} 
            setActiveTab={setActiveTab} 
            activeTab={activeTab} 
          />
        </footer>
      )}
    </div>
  );
};

export default MainLayout;