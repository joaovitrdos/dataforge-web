import React, { FC } from "react";
import "./Navbar.css";
import Logo from "../../assets/logo.png"; // importa a imagem
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <img src={Logo} alt="Logo" className="img-logo" /> {/* usa a variável */}
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
