import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../services/users-services";
import logo from "../../assets/logo.png";
import "./Header.scss";

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const id = localStorage.getItem("SavedId");
  const [user, setUser] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [printName, setPrintName] = useState(false);

  const fetchUser = async () => {
    const response = await getCurrentUser(id);
    setUser(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onLogoutClick = () => {
    if (props.setLoggedIn) {
      props.setLoggedIn(false);
    }
    localStorage.removeItem("SavedToken");
    localStorage.removeItem("SavedId");
    navigate("/");
  };

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

  // Check if on the friends page or chat page
  useEffect(() => {
    const isFriendsPage = location.pathname === "/friends";
    const isChatPage = location.pathname.startsWith("/chat/");

    setPrintName(isFriendsPage || isChatPage);
  }, [location.pathname]); // Add dependency on pathname to rerun when it changes

  return (
    <header className="header">
      <div className="header__logo-section">
        <Link to="/bio">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        {printName && (
          <h2 className="header__pet-name">{user.pet_name}'s Pawdl</h2>
        )}
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
