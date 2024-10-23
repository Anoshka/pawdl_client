import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../../services/users-services";
import "./Header.scss";
import dog from "../../assets/dog_2.jpeg";

const Home = (props) => {
  const { loggedIn, email } = props;
  console.log("props are ", loggedIn, email);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id is ", id);
  const [user, setUser] = useState({});
  console.log("my props are ", id);

  const fetchUser = async () => {
    const response = await getCurrentUser(id);
    console.log("data is ", response.data);
    setUser(response.data);
    return response.data;
  };

  useEffect(() => {
    const data = fetchUser();
  }, [id]);

  const onLoginClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  const onSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="main">
      {/* <div className={"input"}>
        <input
          className={"input__button"}
          type="button"
          onClick={onLoginClick}
          value={loggedIn ? "Log out" : "Log in"}
        />
        {!loggedIn && (
          <input
            className={"input__button"}
            type="button"
            onClick={onSignupClick}
            value={"Sign up"}
          />
        )}
      </div>
      {loggedIn ? <div>Your email address is {email}</div> : <div />} */}

      <div className="profile">
        <div className="profile__nav-bar">
          <Link to="/friends">
            <h3 className="profile__nav">Friends</h3>
          </Link>
        </div>
        <img src={dog} className="profile__image" />
      </div>
    </div>
  );
};

export default Home;
