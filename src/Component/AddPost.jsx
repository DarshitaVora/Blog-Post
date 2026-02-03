import React, { useState, useEffect, useContext } from "react";
import './AddPost.css';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import loaderGif from "../assets/Loader.gif";
import ModeContext from "../Context/ModeContext";

export function AddPost() {

  const ctx=useContext(ModeContext)
    console.log(ctx,"Context Value");
  

  const navigate = useNavigate();
  const location = useLocation();
  const editPostId = location.state?.id || null;

  

  const [loading, setLoading] = useState(false); // loader OFF by default
  
  const [createPostFormData, setCreatePostFormData] = useState({
    title: "",
    body: "",
    image: "",
  });
  const [error, setError] = useState({});

  // Load existing post if editing
  useEffect(() => {
    if (!editPostId) return;
    const posts = JSON.parse(localStorage.getItem("postData")) || [];
    const postToEdit = posts.find((p) => p.id === editPostId);
    if (postToEdit) {
      setCreatePostFormData({
        title: postToEdit.title,
        body: postToEdit.body,
        image: postToEdit.image,
      });
    }
  }, [editPostId]);

  const handleChange = (field, value) => {
    setError((e) => ({ ...e, [field]: "" }));
    setCreatePostFormData({ ...createPostFormData, [field]: value });
  };

  const handleImageChange = (file) => {
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError((e) => ({ ...e, image: "Only JPG, JPEG, PNG images are allowed" }));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setCreatePostFormData({ ...createPostFormData, image: reader.result });
      setError((e) => ({ ...e, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!createPostFormData.title.trim()) newErrors.title = "Title is required";
    if (!createPostFormData.body.trim()) newErrors.body = "Body is required";
    if (!createPostFormData.image.trim()) newErrors.image = "Image is required";
    setError(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Show loader overlay
    setLoading(true);

    setTimeout(() => {
      const existingPosts = JSON.parse(localStorage.getItem("postData")) || [];

      if (editPostId) {
        const updatedPosts = existingPosts.map((p) =>
          p.id === editPostId ? { ...p, ...createPostFormData } : p
        );
        localStorage.setItem("postData", JSON.stringify(updatedPosts));
        toast.success("Post Updated Successfully.🤗");
      } else {
        const updatePosts = [...existingPosts, { id: uuidv4(), ...createPostFormData }];
        localStorage.setItem("postData", JSON.stringify(updatePosts));
        toast.success("Post Added Successfully.🤗");
      }

      // navigate home
      navigate("/");
    }, 2000); // loader show for 2 seconds
  };

  return (
    <div className={`main-container ${ctx.mode == "dark" ? "form-dark":"form-light"}`} style={{ position: "relative" }}>
      <h1 className="title">{editPostId ? "Let's Edit Post" : "Let's Create New Post"}</h1><br/>
      <form className="main-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={createPostFormData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        /><br/>
        {error.title && <span className="error">{error.title}</span>}

        <textarea
          placeholder="Enter Body"
          value={createPostFormData.body}
          onChange={(e) => handleChange("body", e.target.value)}
        /><br/>
        {error.body && <span className="error">{error.body}</span>}

        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={(e) => handleImageChange(e.target.files[0])}
        /><br/>
        {error.image && <span className="error">{error.image}</span>}

        {createPostFormData.image && (
          <img src={createPostFormData.image} alt="preview" style={{ width: 200, borderRadius: 10 }} />
        )}

        <div className="btn-group">
          <button className="btnpost">{editPostId ? "Update Post" : "Add Post"}</button>
          {editPostId && (
            <button type="button" className="btncancle" onClick={() => navigate("/")}>
              Cancel
            </button>
          )}
        </div>

        <ToastContainer />
      </form>

      {/* ✅ Loader overlay */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <img src={loaderGif} alt="loading" style={{ width: 150 }} />
        </div>
      )}
    </div>
  );
}
