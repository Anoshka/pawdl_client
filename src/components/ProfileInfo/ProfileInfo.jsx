import dog from "../../assets/dog_2.jpeg";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { FaPaw } from "react-icons/fa6";
import { FaDog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProfileInfo.scss";
import { getUserPosts } from "../../services/users-services";
import { useEffect, useState } from "react";

function ProfileInfo(props) {
  const user = props.info;
  const id = localStorage.getItem("SavedId");
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const addProfile = () => {
    navigate("/post/add");
  };

  const userPosts = async () => {
    const response = await getUserPosts(id);
    setPosts(response.data);
    return response.data;
  };

  useEffect(() => {
    userPosts();
  }, []);

  return (
    <div className="profile-info">
      <div className="profile-info__top-line">
        <img src={dog} alt="Profile" className="profile-info__image" />
        <div className="profile-info__stats">
          <div className="profile-info__stat">
            <div className="profile-info__stat-flex">
              <FaDog className="profile-info__stat--paw" />
              <div className="profile-info__stat--info">
                <h3 className="profile-info__stat--number">{posts.length}</h3>
                <p className="profile-info__stat--description">Posts</p>
              </div>
            </div>
          </div>
          <div className="profile-info__stat">
            <div className="profile-info__stat-flex">
              <FaPaw className="profile-info__stat--paw" />
              <div className="profile-info__stat--info">
                {user.pet_name == "Zeca" && (
                  <h3 className="profile-info__stat--number">0</h3>
                )}
                {user.pet_name != "Zeca" && (
                  <h3 className="profile-info__stat--number">7</h3>
                )}
                <p className="profile-info__stat--description">Friends</p>
              </div>
            </div>
          </div>
        </div>
        {user.id == id && (
          <AiTwotonePlusCircle
            className="profile-info__add-post"
            onClick={() => addProfile()}
          />
        )}
      </div>
      <div className="profile-info__details">
        <h2 className="profile-info__pet-name">{user.pet_name}</h2>
        {user.temperament != 0 && (
          <p className="profile-info__pet-temperament">{user.temperament}</p>
        )}
        {user.bio != 0 && <p className="pet-bio">{user.bio}</p>}
      </div>
    </div>
  );
}

export default ProfileInfo;
