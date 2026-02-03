import React, { useContext, useState } from "react";
import "./Navbar.css";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ConformationModel from "./ConformationModel";
import EditModal from "./EditProfile";
import ModeContext from "../Context/ModeContext";


export function NavBar() {

  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const ctx=useContext(ModeContext)
  console.log(ctx,"Context Value");


  const loggedInUserData =
    JSON.parse(localStorage.getItem("LoginData")) || {};
    console.log(loggedInUserData);

    const [showModal,setShowModel]=useState(false);

    const showModalHandler=()=>
    {
      setShowModel(true);
    };

    const hideModalHandler=()=>
    {
      setShowModel(false);
    };

  const handleLogout = () => {
    localStorage.removeItem("LoginData");
    setShowModel(false)
    toast.success("Logout Successfully 🤗");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <nav>
        <div className={`nav-main ${ctx.mode == "dark" ? "nav-dark":"nav-light"}`}>

          <h2 className="logo">BlogPost</h2>

          <div className="menu">
            <ul>
              <li><NavLink 
                          to="/" 
                          className={({isActive})=>(isActive ? "Active-link":"color")}
                    >
                Home
                </NavLink>
                </li>
              {loggedInUserData?.role==="Admin" ?<li><NavLink 
                        to="/new-post" 
                        className={({isActive})=>(isActive ? "Active-link":"color")}>
                          New Post
                </NavLink>
                </li>:<></>}

                <li><NavLink 
                          to="/explore-post" 
                          className={({isActive})=>(isActive ? "Active-link":"color")}
                    >
                
                ExplorePost
                </NavLink>
                </li>
              <li>
                <span
                  className="color"
                  onClick={showModalHandler}  
                  style={{ cursor: "pointer" }}
                >
                  LogOut
                </span>
              </li>
            </ul>
          </div>

          <div className="dark">
            <BsFillMoonStarsFill size={15} />&nbsp;
            <p onClick={ctx.toggleMode}>{ctx.mode==="dark" ? "Light" : "Dark"}
              &nbsp;&nbsp;   
                {loggedInUserData.role && (
                  <span className="role-circle" onClick={()=>setShowEdit(true)}>
                    {loggedInUserData.role.charAt(0).toUpperCase()}
                  </span>
                )}
              </p>

          </div>

        </div>
      </nav>

      {/* 🔔 Toast container */}
      <ToastContainer position="top-right" />

      {showModal && (<ConformationModel 
        title="Logout ?"
        desc="You are about to log out, are you sure?"
        onClose={hideModalHandler}
        onConfrim={handleLogout}
        confirmBtnText="Logout"
      />
      )}

{showEdit && 
<EditModal 
        onClose={() => setShowEdit(false)}
        userId={loggedInUserData?.id}
/>}
    </>
  );
}
