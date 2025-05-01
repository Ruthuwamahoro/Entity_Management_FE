import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const sidebarItems = [
    { path: '/', label: 'Entity Management'},
    { path: '/web-service', label: 'Web Service Operations'},
  ];

  return (
    <>
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-dark-accent hover:bg-dark-hover"
        onClick={toggleMobileMenu}
      >
        <MenuIcon />
      </button>

      <div className="hidden lg:flex flex-col w-64 bg-dark-secondary">
        <div className="px-6 py-8">
          <h1 className="text-xl font-bold text-accent">Entity Manager</h1>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({isActive}) => 
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      />

      <div 
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-dark-secondary transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-8">
          <h1 className="text-xl font-bold text-accent">Entity Manager</h1>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({isActive}) => 
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              onClick={toggleMobileMenu}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}