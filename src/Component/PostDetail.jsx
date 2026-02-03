import React, { useEffect, useState } from "react";
import "./PostDetail.css";
import ConformationModel from "./ConformationModel";
import { useParams, useNavigate } from "react-router-dom";


export function PostDetail() {

  const loggedInUserData =
  JSON.parse(localStorage.getItem("LoginData")) || {};
  console.log(loggedInUserData);


  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);

  const { postId } = useParams();
  const navigate = useNavigate();

  const postData = JSON.parse(localStorage.getItem("postData")) || [];

  const handleEdit=(id)=>{
    console.log({id});
    navigate("/new-post",{state:{id}});
   }

  // 🔹 current post load
  useEffect(() => {
    const filtered = postData.find(
      (item) => String(item.id) === String(postId)
    );
    if (filtered) {
      setCurrentPost(filtered);
    }
  }, [postId,localStorage]);

  // 🔹 open delete modal (current post)
  const openDeleteModal = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  // 🔹 confirm delete
  const confirmDelete = () => {
    const updatedPostData = postData.filter(
      (_, i) => i !== selectedIndex
    );

    localStorage.setItem("postData", JSON.stringify(updatedPostData));
    setShowModal(false);
    navigate("/"); // home redirect
  };

  if (!currentPost) {
    return <p className="no">No Data Found</p>;
  }

  return (
    <>
      {/* 🔹 Post Detail Section */}
      <div className="container">
        <div className="image-section">
          <img
            src={currentPost.image}
            alt="Description"
            className="page-image"
          />
        </div>

        <div className="description-section">
          <h1>{currentPost.title}</h1>
          <p>{currentPost.body}</p>
          
          {loggedInUserData?.role==="Admin" ?<button className="edt-btn"
          onClick={() => handleEdit(currentPost.id)}>Edit</button>:<></>}

          {loggedInUserData?.role==="Admin" ?<button
            className="dlt-btn"
            onClick={() =>
              openDeleteModal(
                postData.findIndex(
                  (item) => String(item.id) === String(postId)
                )
              )
            }
          >
            Delete
          </button>:<></>}

         
        </div>
      </div>

      

      {/* 🔹 Confirmation Modal */}
      {showModal && (
        <ConformationModel
          title="Delete Post?"
          desc="Are you sure you want to delete this post?"
          onClose={() => setShowModal(false)}
          onConfrim={confirmDelete}
          confirmBtnText="Delete"
        />
      )}
    </>
  );
}
