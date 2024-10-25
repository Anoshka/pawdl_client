import dog from "../../assets/dog_2.jpeg";
import "./ProfileInfo.scss";

function ProfileInfo(props) {
  const user = props.info;

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
      </div>
      <div className="profile-info__details">
        <h2 className="profile-info__pet-name">{user.pet_name}</h2>
        <h3 className="profile-info__pet-bio">{user.bio}</h3>
      </div>
    </div>
  );
}

export default ProfileInfo;
