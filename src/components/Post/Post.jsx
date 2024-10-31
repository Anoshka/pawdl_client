import dog from "../../assets/zeca.jpeg";
import { FaHeart, FaComment } from "react-icons/fa";
import "./Post.scss";
import editIcon from "../../assets/edit-coral-24px-svg.png";
import deleteIcon from "../../assets/delete.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { editPost, getDog } from "../../services/posts-services";

function Post(props) {
  const { user, userId } = props;
  const [post, setPost] = useState("");
  const id = localStorage.getItem("SavedId");

  const likesHandler = async () => {
    const postId = props.user.id;
    const data = {
      id: postId,
      user_id: userId,
      image: props.user.image,
      likes: Number(props.user.likes) + 1,
      description: props.user.description,
    };
    const response = await editPost(postId, data);
  };

  useState(async () => {
    const dogLink = await getDog(userId);
    setPost(dogLink);
  }, []);

  return (
    <div className="post">
      <div className="post__card">
        {userId == id && (
          <div className="post__icons">
            <Link to={`/post/${id}`} className="post__delete-link" user={user}>
              <img
                className="post__delete"
                src={deleteIcon}
                alt="Delete Post"
              />
            </Link>
            <Link to={`/post/${id}`} className="post__edit-link" user={user}>
              <img className="post__edit" src={editIcon} alt="Edit Post" />
            </Link>
          </div>
        )}

        <img src={dog} alt="Pet Photo" className="post__photo" />
        <div className="post__icons">
          <FaHeart className="post__icon" onClick={likesHandler} />
          <p className="post__likes">{props.user.likes}</p>
          <FaComment className="post__icon" />
          <p className="post__comments">0</p>
        </div>
        <p className="post__description">{props.user.description}</p>
        <p className="post__time">{user.created_at.split("T")[0]}</p>
      </div>
    </div>
  );
}

export default Post;
