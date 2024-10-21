import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import "./styles.css" 
import { HeaderProps } from "../dtos/HeaderDto";
import { useLocation } from "react-router-dom";
const Header: React.FC<HeaderProps> = ({
  title,
  navLinks,
  customStyles = {},
  profile,
  inputType,
  inputPlaceHolder,
  maxLinks = 6,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    window.location.href = "/login";
  };
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(navLinks,"navlinks")
  return (
    <header className="header-container">
      <button className="menu-bar" onClick={toggleMenu}>
        <FaBars size={50} />
      </button>

      <nav className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-side-container">
          <p className="mobile-profile-text">Hi, {profile}</p>
          <button className="close-menu-bar" onClick={toggleMenu}>
            <FaBars size={50} color="black" />
          </button>
        </div>
        <ul className="nav-list">
          {navLinks?.slice(0, maxLinks).map((link, index) => (
            <div className="mobile-div-container">
              {/* <a className="menu-icon">
                {React.createElement(link.icon, { size: 40 })}
              </a> */}
              <li key={index} className="nav-item" style={customStyles.navItem}>
                <a
                  href={link.url}
                  className="nav-link"
                  style={customStyles.navLink}
                  onClick={toggleMenu} // Close menu when clicking a link
                >
                  {link.label}
                </a>
              </li>
            </div>
          ))}
        </ul>
      </nav>
      <h3 className="header-title">{title}</h3>
      {/* <div className="search-container">
        <input
          type={inputType}
          placeholder={inputPlaceHolder}
          className="search-input"
        />
        <FaSearch size={30} color="black" />
      </div> */}
      <nav>
        <ul className="web-nav-list">
          {navLinks?.slice(0, maxLinks).map((link, index) => (
            <li
              key={index}
              className="web-nav-item"
              style={customStyles.navItem}
            >
              <a
                href={link.url}
                className={currentPath===link.url ? "web-nav-link active" : "web-nav-link"}
                style={customStyles.navLink}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* <div className="mobile-icon">
        <FaUserCircle size={50} />
      </div> */}
      {/* <div className="profile-container">
        <FaUserCircle size={30} color="black" />
        <p className="profile-text">{profile}</p>
      </div> */}
      {/* <button className="logout-button" onClick={handleLogout}>
        Logout
      </button> */}
      <button className="mobile-button" onClick={handleLogout}>
        <FiLogOut size={50} />
      </button>
    </header>
  );
};

export default Header;
