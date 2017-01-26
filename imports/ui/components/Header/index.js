import React from 'react';
import { Link } from 'react-router';
import AccountsUIWrapper from '../../components/AccountsUIWrapper';
import './Header.css';

const Header = () => (
  <nav className="navbar">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link className="navbar-brand" to="/">CATTS</Link>
      </div>
      <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav">
          <li><Link to="/annotate">Annotate</Link></li>
          <li><Link to="/highscores">Highscores</Link></li>
          <li><Link to="/download">Download</Link></li>
          <li><Link to="/help">Help</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a><AccountsUIWrapper /></a></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
