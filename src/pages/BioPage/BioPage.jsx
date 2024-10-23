import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser, getUserPosts } from "../../services/users-services";
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
  const fetchPosts = async () => {
    const response = await getUserPosts(id);
    console.log("posts are ", response.data);
    return response.data;
  };

  useEffect(() => {
    const data = fetchUser();
    const posts = fetchPosts();
  }, []);

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
    </div>
  );
};

export default Home;
