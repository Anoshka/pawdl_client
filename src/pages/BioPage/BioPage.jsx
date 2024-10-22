import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../../services/users-services";
import "./BioPage.scss";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();
  const { id } = useParams();
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
    <div className="mainContainer">
      <ProfileInfo info={user} />
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"input"}>
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
      {loggedIn ? <div>Your email address is {email}</div> : <div />}
    </div>
  );
};

export default Home;
