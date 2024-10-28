import { Link } from "react-router-dom";
import dog from "../../assets/dog_2.jpeg";
import { AiTwotoneMessage } from "react-icons/ai";
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
            {user.bio != 0 && <p className="pet-bio">{user.bio}</p>}
          </div>
          <div className="icons">
            <Link to={`/chat/${user.id}`}>
              <AiTwotoneMessage className="chat-icon" />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Friend;
