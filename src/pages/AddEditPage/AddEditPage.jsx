import img from "../../assets/dog_1.jpg";
import "./AddEditPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPosts } from "../../services/posts-services";
import axios from "axios";

const baseUrl = "http://localhost:6060/posts/create";

function AddEditPage() {
  const navigate = useNavigate();
  const id = localStorage.getItem("SavedId");

  async function postData(data) {
    try {
      const response = await axios.createPosts(data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const [image, setImage] = useState(img);
  const [description, setDescription] = useState([]);

  const isDescriptionValid = () => {
    if (description.length == 0) {
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    if (!isDescriptionValid()) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    if (isFormValid()) {
      event.preventDefault();
      // eslint-disable-next-line react/prop-types
      const data = {
        user_id: id,
        image: img,
        likes: 1,
        description: description,
      };

      const postResponse = await createPosts(data);

      if (postResponse) {
        setDescription("");
      }
      alert("Post uploaded successfully!");
      navigate("/bio");
    } else {
      alert("Failed to upload post, please enter valid form entries!");
      return;
    }
  };

  useEffect(() => {
    document.title = "Upload Page";
  }, []);

  return (
    <div className="post__upload">
      <h1 className="post__upload--title">Upload Post</h1>
      <img className="post__upload--main" src={img} alt="puppy pic" />

      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">SAY SOMETHING</h2>
        <input
          type="text"
          name="form"
          placeholder="Woof's on your mind?"
          className="form__input form__input--description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {description.length == 0 && (
          <p className="form__input--check">Please enter valid description</p>
        )}
        <button className="form__button form__button--upload">POST</button>
        <div className="form__tablet">
          <Link className="form__cancel" to={`/bio`}>
            CANCEL
          </Link>

          <button className="form__button form__button--upload form__button--right">
            POST
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditPage;
