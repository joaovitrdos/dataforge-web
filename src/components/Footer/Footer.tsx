import React, { FC } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="logo">✦Df</span>
        <span className="copy">© Data Forge, Inc. 2025</span>
      </div>
      <div className="footer-right">
        <a href="https://www.notion.so/SUPPORT-2637b168d75a80a0bedbf1734532313c?source=copy_link">Support</a>
        <a href="https://www.notion.so/PRIVACY-24c7b168d75a8008a130eed80a10502b?source=copy_link">Privacy</a>
        <a href="https://github.com/joaovitrdos/dataforge-api" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
