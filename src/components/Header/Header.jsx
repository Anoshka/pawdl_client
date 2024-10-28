import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/users-services";
import logo from "../../assets/logo.png";
import "./Header.scss";

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();
  const id = localStorage.getItem("SavedId");
  const [user, setUser] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchUser = async () => {
    const response = await getCurrentUser(id);
    setUser(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onLogoutClick = () => {
    props.setLoggedIn(false);
    localStorage.removeItem("SavedToken");
    localStorage.removeItem("SavedId");
    navigate("/");
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="header">
      <div className="header__logo-section">
        <Link to="/bio">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/friends" className="nav-link">
          Friends
        </Link>
        <Link to="/bio" className="nav-link">
          Bio
        </Link>

        <div className="dropdown" ref={dropdownRef}>
          <div className="hamburger" onClick={toggleDropdown}>
            &#9776;
          </div>
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to="/edit-user" className="dropdown-item">
                Edit User Info
              </Link>
              <button onClick={onLogoutClick} className="dropdown-item">
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Home;
