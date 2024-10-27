import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddEditPage.scss";
import { FaCamera } from "react-icons/fa"; // Importing an icon

function AddEditPage() {
  const { id } = useParams();
  const [post, setPost] = useState({
    description: "",
    created_at: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null); // Ref for file input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`); // Adjust API endpoint
      const data = await response.json();
      setPost(data);
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", post.description);
    formData.append("created_at", post.created_at);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: formData,
    });

    navigate(`/post/${id}`); // Redirect to the post page after editing
  };

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="description"
          value={post.description}
          onChange={handleChange}
          placeholder="Update your description..."
          required
        />
        <div className="image-upload" onClick={handleImageClick}>
          <FaCamera className="add-image-icon" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        {post.image && (
          <img src={post.image} alt="Current post" className="current-image" />
        )}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default AddEditPage;
