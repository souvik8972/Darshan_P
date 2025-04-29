import React, { useState } from 'react';
import logo from '../src/assets/logo.png'

const HamburgerMenu = ({colors}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        zIndex: 1000,
      
        fontSize: '2rem',
        
        padding:'.1rem',
        
        
        
      }}>
      {/* Hamburger Icon */}
      <div>
      </div>
      <div 
        onClick={toggleMenu} 
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          cursor: 'pointer',
          
          color :`${colors}`,

          
        }}
      >
        ☰
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul style={{
          position: 'fixed',
          top: '70px',
          right: '20px',
          backgroundColor: '#333',
          padding: '10px 20px',
          borderRadius: '10px',
          listStyle: 'none',
          zIndex: 999,
          color: '#fff',
          transition: 'opacity 0.3s ease',
        }}>
          <li style={{ marginBottom: '10px' }}>Home</li>
          <li style={{ marginBottom: '10px' }}>About</li>
          <li style={{ marginBottom: '10px' }}>Contact</li>
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;
