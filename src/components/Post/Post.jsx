import dog from "../../assets/dog_1.jpg";
import { FaHeart, FaComment } from "react-icons/fa";
import "./Post.scss";
import editIcon from "../../assets/edit-coral-24px-svg.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Post(props) {
  const { user, userId } = props;
  const id = localStorage.getItem("SavedId");

  return (
    <div className="post">
      <div className="post__card">
        {userId == id && (
          <Link to={`/post/${id}`} className="post__edit-link" user={user}>
            <img className="post__edit" src={editIcon} alt="Edit Post" />
          </Link>
        )}

        <img src={dog} alt="Pet Photo" className="post__photo" />
        <div className="post__icons">
          <FaHeart className="post__icon" />
          <p className="post__likes">1</p>
          <FaComment className="post__icon" />
          <p className="post__comments">0</p>
        </div>
        <p className="post__description">{user.description}</p>
        <p className="post__time">{user.created_at.split("T")[0]}</p>
      </div>
    </div>
  );
}

export default Post;
