import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser, getUserPosts } from "../../services/users-services";
import "./BioPage.scss";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import Post from "../../components/Post/Post";

const Home = (props) => {
  let id = localStorage.getItem("SavedId");

  if (useParams()["id"] !== undefined) {
    id = useParams()["id"];
  }
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchUser = async () => {
    const response = await getCurrentUser(id);
    setUser(response.data);
    return response.data;
  };
  const fetchPosts = async () => {
    const response = await getUserPosts(id);
    setPosts(response.data);
    return response.data;
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [posts]);

  const onLoginClick = () => {
    if (loggedIn) {
      localStorage.removeItem("SavedToken");
      localStorage.removeItem("SavedId");
      props.setLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  const onSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="bio-page">
      <ProfileInfo info={user} />

      {posts.length === 0 && (
        <div className="posts-list__not-found">
          <p className="posts-list__not-found-description">No posts yet!</p>
        </div>
      )}
      <div className="posts__list">
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              user={post}
              userId={user.id}
              className="posts__post"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
