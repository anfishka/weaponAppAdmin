import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Weapons</Link>
        </div>
      </div>
    </header>
  );
};
export default Header;