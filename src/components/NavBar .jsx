import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '1rem',
      background: 'rgba(16, 16, 16, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 1000
    }}>
      <ul style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        margin: 0,
        padding: 0,
        listStyle: 'none'
      }}>
        <li>
          <Link to="/" style={linkStyle}>Car</Link>
        </li>
        <li>
          <Link to="/phoenix" style={linkStyle}>Phoenix</Link>
        </li>
        <li>
          <Link to="/CCTV" style={linkStyle}>CCTV</Link>
        </li>
        <li>
          <Link to="/dragon" style={linkStyle}>Dragon</Link>
        </li>

      </ul>
    </nav>
  );
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: '500',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
};

export default Navbar;