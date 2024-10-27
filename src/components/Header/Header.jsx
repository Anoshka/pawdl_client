import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/users-services";
import "./Header.scss";
import dog from "../../assets/dog_2.jpeg";

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();
  const id = localStorage.getItem("SavedId");
  const [idLink, setIdLink] = useState("");
  const [user, setUser] = useState({});

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const fetchUser = async () => {
    const response = await getCurrentUser(id);
    setUser(response.data);
    return response.data;
  };

  useEffect(() => {
    const data = fetchUser();
  }, []);

  const onLoginClick = () => {
    if (loggedIn) {
      localStorage.removeItem("SavedToken");
      localStorage.removeItem("SavedId");
      props.setLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  const onLogoutClick = () => {
    if (loggedIn) {
      props.setLoggedIn(false);
    }
    localStorage.removeItem("SavedToken");
    localStorage.removeItem("SavedId");

    navigate("/logout");
  };

  const onSignupClick = () => {
    navigate("/register");
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/discover" className="nav-link">
          Discover
        </Link>
        <Link to="/friends" className="nav-link">
          Friends
        </Link>
        <Link to="/" className="nav-link">
          Bio
        </Link>

        <div className="dropdown">
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
