import dog from "../../assets/dog_1.jpg";
import "./Friend.scss";

function Friend(props) {
  console.log("friend is ", props.user);
  const user = props.user;
  return (
    <div className="user">
      <div className="user__current">
        <img src={dog} className="user__avatar" />
        <h3 className="user__pet-name">{user.pet_name}</h3>
        <p className="user__bio">{user.bio}</p>
      </div>
    </div>
  );
}

export default Friend;
