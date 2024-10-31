import "./AddEditPage.scss";
import img from "../../assets/zeca.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPosts } from "../../services/posts-services";

function AddEditPage() {
  const navigate = useNavigate();
  const id = localStorage.getItem("SavedId");

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const isDescriptionValid = () => description.length > 0;

  const isFormValid = () => isDescriptionValid() && image !== null;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid()) {
      const data = {
        user_id: id,
        image: img,
        likes: 1,
        description: description,
      };

      try {
        const postResponse = await createPosts(data);
        if (postResponse) {
          setDescription("");
          setImage(null);
          alert("Post uploaded successfully!");
          navigate("/bio");
        }
      } catch (error) {
        console.error("Error uploading post:", error);
        alert("Failed to upload post. Please try again.");
      }
    } else {
      alert("Failed to upload post, please enter valid form entries!");
    }
  };

  useEffect(() => {
    document.title = "Upload Page";
  }, []);

  return (
    <div className="post__upload">
      <h1 className="post__upload--title">Upload Post</h1>
      <div className="image-container">
        {image ? (
          <>
            <img className="post__upload--main" src={image} alt="Uploaded" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="image-upload__label image-upload__label--change"
            >
              Change Image
            </label>
          </>
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="image-upload__label">
              Upload Image
            </label>
          </>
        )}
      </div>

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
        {description.length === 0 && (
          <p className="form__input--check">Please enter valid description</p>
        )}
        <button
          className="form__button form__button--upload"
          onClick={handleSubmit}
        >
          POST
        </button>
        <div className="form__tablet">
          <Link className="form__cancel" to={`/bio`}>
            CANCEL
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddEditPage;
