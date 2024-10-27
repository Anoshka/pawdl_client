import { Link } from "react-router-dom";
import dog from "../../assets/dog_1.jpg";
import "./Friend.scss";

function Friend(props) {
  const user = props.user;
  return (
    <Link to={`/user/${user.id}`}>
      <div className="container">
        <div className="profile-card">
          <div className="profile-card__top">
            <img src={dog} alt="Pet Photo" className="pet-photo" />
            <h2 className="pet-name">{user.pet_name}</h2>
            <p className="pet-bio">{user.bio}</p>
          </div>
          <div className="icons">
            <Link to="/chat">
              <i className="chat-icon">💬</i>
            </Link>
            <i className="add-icon">✔</i>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Friend;
