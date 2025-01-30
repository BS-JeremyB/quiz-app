// src/components/Header.tsx
import React, { useState } from 'react';
import logo from '../../assets/quizz-logo.png';
import './Header.css';

// Exemple : tu peux importer tes composants Login/Register
import Login from '../auth/Login';
import Register from '../auth/Register';

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {/* On sépare le header pur (bandeau) 
          et les modals en dehors du header, 
          ainsi ils ne seront pas limités par l'overflow du header. */}
      <header className="header">
        {/* Logo centré */}
        <img src={logo} alt="Quiz Logo" className="header-logo" />

        {/* Boutons en haut à droite */}
        <div className="header-right">
          <button className="header-button" onClick={() => setShowLogin(true)}>
            Login
          </button>
          <button className="header-button" onClick={() => setShowRegister(true)}>
            Register
          </button>
        </div>
      </header>

      {/* Modals en dehors du <header> pour être sûrs 
          qu'ils soient en position fixe sur tout l'écran */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowLogin(false)}
            >
              X
            </button>
            <Login />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowRegister(false)}
            >
              X
            </button>
            <Register />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
