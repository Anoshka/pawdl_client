import dog from "../../assets/dog_1.jpg";
import { FaHeart, FaComment } from "react-icons/fa";
import "./Post.scss";

function Post(props) {
  const { user } = props;
  console.log("posts are ", user);

  return (
    <div className="post">
      <div className="post__card">
        <img src={dog} alt="Pet Photo" className="post__photo" />
        <div className="post__icons">
          <FaHeart className="post__icon" />
          <p className="post__likes">0</p>
          <FaComment className="post__icon" />
          <p className="post__comments">0</p>
        </div>
        <p className="post__description">{user.description}</p>
        <p className="post__time">{user.created_at}</p>
      </div>
    </div>
  );
}

export default Post;
