import { useEffect, useState } from "react";
import "./ExplorePost.css";
import { FaSearch } from "react-icons/fa";
import { Card } from "./Card";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import ConformationModel from "./ConformationModel";

export default function ExplorePost() {

  const [createPostData, setCreatePostData] = useState({
    title: "",
    body: "",
   
  });

    const[showForm,setShowForm]=useState(false);

  const [error, setError] = useState({});
  const[editPostId,setEditPostID]=useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(10);

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteId, setDeleteId] = useState(null);

  const startIndex = (currentPage - 1) * postPerPage;
  const totalPages = Math.ceil(filteredPosts.length / postPerPage);
//------------------------------//
  const openDeleteModel = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  
  const closeDeleteModel = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };
  
//------------------------------//
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);

    const result = posts.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.body.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(result);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://696b4a8b624d7ddccaa0b6e5.mockapi.io/postdata");
      const data = await response.json();
      const reverseData=[...data].reverse();
      setFilteredPosts(reverseData);
      setPosts(reverseData);
    } catch (err) {
      alert("API Error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://696b4a8b624d7ddccaa0b6e5.mockapi.io/postdata/${deleteId}`,
        { method: "DELETE" }
      );
  
      if (!res.ok) throw new Error("Delete failed");
  
      toast.success("Post Deleted Successfully");
      fetchData();
      closeDeleteModel();
    } catch (error) {
      toast.error("Delete Failed");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreatePostData({ ...createPostData, [name]: value });
  
    // realtime validation clear
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  

  const validate = () => {
    let err = {};
    if (!createPostData.title.trim()) err.title = "Title is required";
    if (!createPostData.body.trim()) err.body = "Body is required";
    setError(err);
    return Object.keys(err).length === 0;
  };

  const postDataGetById= async(id)=>{
    try{
      setLoading(true);
      setEditPostID(id);
      const response= await fetch(
        `https://696b4a8b624d7ddccaa0b6e5.mockapi.io/postdata/${id}`,
        {method:"GET"}
      );
      if(!response.ok){
        throw new toast.error("Failed to fetch post by Id");
      }
      const data=await response.json();
      setCreatePostData({
            title:data.title||"",
            body:data.body||"",
            image:data.image||""
      });
      setShowForm(true);
      fetchData();
    }catch(error){
      console.error("GET By Id API Error:",error.message);
    }finally{
      setLoading(false);
    }
  }


  const handleCancel = () => {
    
    setShowForm(false);
 
    setCreatePostData({
      title: "",
      body: "",
    });
    
    setError({});
   
    setEditPostID(null); 
  };





  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validate()) return;
  
    try {
      setLoading(true);
  
      const url = editPostId
        ? `https://696b4a8b624d7ddccaa0b6e5.mockapi.io/postdata/${editPostId}`
        : `https://696b4a8b624d7ddccaa0b6e5.mockapi.io/postdata`;
  
      const method = editPostId ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: createPostData.title,
          body: createPostData.body,
          image: createPostData.image || `https://picsum.photos/seed/${Date.now()}/200/300`,
        }),
      });
  
      if (!response.ok) {
        throw new Error("API Error");
      }
  
      if (editPostId) {
        toast.success("Post Updated Successfully");
      } else {
        toast.success("Post Added Successfully");
      }
  
      setCreatePostData({ title: "", body: "", image: "" });
      setEditPostID(null);
      setShowForm(false);
      fetchData(); // refresh list
  
    } catch (error) {
      console.error(error);
      toast.error("Post Save Failed");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <>
      <div className="explore-container">
        <h2>Explore Posts</h2>

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search item"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* ---------Form------------ */}
      <div className="btncreate">
        <button className="create-form-btn" onClick={()=>setShowForm(true)}>Create Form</button>
{showForm &&(
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="btn-form">
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={createPostData.title}
              onChange={handleChange}
            />
            {error.title && <p className="error-text">{error.title}</p>}

            <textarea
              name="body"
              placeholder="Enter Body"
              value={createPostData.body}
              onChange={handleChange}
            />
            {error.body && <p className="error-text">{error.body}</p>}
          </div>

          <div className="btn-group-form">
            <button type="submit" className="btnsubmit">Submit</button>

            <button
              type="button"
              className="btn-cancle"
              onClick={handleCancel} 
            >
              Cancel
            </button>
          </div>
        </form>)}
      </div>
      {/* ---------Form------------ */}

      <div className="explore-grid">
        {loading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) :filteredPosts.length === 0 ? (
          <h2 style={{ textAlign: "center", color: "gray" }}>No Data Found</h2>
        ) : (
          filteredPosts
            .slice(startIndex, startIndex + postPerPage)
            .map((item) => (
              <Card
                key={item.id}
                title={item.title}
                desc={item.body}
                image={item.image}
                id={item.id}
                from={"explore"}
                onDelete={()=>openDeleteModel(item.id)}
                onEdit={()=>postDataGetById(item.id)}
              />
            ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((p) => p - 1)}
        onNext={() => setCurrentPage((p) => p + 1)}
        postPerPage={postPerPage}
        onPageSizeChange={(size) => {
          setPostsPerPage(size);
          setCurrentPage(1);
        }}
      />
      {showDeleteModal &&(<ConformationModel
     
      title="Delete Post?"
      desc="Are you sure you want to delete this post ?"
      onClose={()=>{setShowDeleteModal(false); setEditPostID(null)}}
      onConfrim={handleDelete}
      confirmBtnText="Delete"
     
    />
      )}
    </>
  );
}
