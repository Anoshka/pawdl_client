import dog from "../../assets/dog_2.jpeg";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./ProfileInfo.scss";

function ProfileInfo(props) {
  const user = props.info;
  const id = localStorage.getItem("SavedId");

  const navigate = useNavigate();

  const addProfile = () => {
    navigate("/post/add");
  };

  return (
    <div className="profile-info">
      <div className="profile-info__top-line">
        <img src={dog} alt="Profile" className="profile-info__image" />
        <div className="profile-info__stats">
          <div className="profile-info__stat">
            <h3 className="profile-info__stat--number">4</h3>
            <p className="profile-info__stat--description">Posts</p>
          </div>
          <div className="profile-info__stat">
            <h3 className="profile-info__stat--number">20</h3>
            <p className="profile-info__stat--description">Friends</p>
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
        <p className="profile-info__pet-bio">{user.bio}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
