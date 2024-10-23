import dog from "../../assets/dog_2.jpeg";
import "./ProfileInfo.scss";

function ProfileInfo(props) {
  const user = props.info;
  console.log("user is ", user);
  return (
    <div className="user">
      <div className="user__top-line">
        <img src={dog} alt="profile pic" className="user__image" />
        <div className="user__stats">
          <div className="user__stat">
            <h3 className="user__stat--number">4</h3>
            <p className="user__stat--description">posts</p>
          </div>
          <div className="user__stat">
            <h3 className="user__stat--number">20</h3>
            <p className="user__stat--description">friends</p>
          </div>
        </div>
      </div>
      <div className="user__details">
        <h2 className="user__pet-name">{user.pet_name}</h2>
        <h3 className="user__pet-bio">{user.bio}</h3>
      </div>
    </div>
  );
}

export default ProfileInfo;
