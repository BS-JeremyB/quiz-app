import React from 'react';
import logo from '../../assets/logo.png'; // Assurez-vous que le logo est bien importé

const Header: React.FC = () => {
  return (
    <div className="header">
      <img src={logo} alt="Quiz Logo" />
    </div>
  );
};

export default Header;
