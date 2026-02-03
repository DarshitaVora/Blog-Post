import React, { useContext, useState } from "react";
import "./Card.css"
import ConformationModel from "./ConformationModel";
import ModeContext from "../Context/ModeContext";

export function Card(props){

   const ctx = useContext(ModeContext); // <-- use context here
    console.log(ctx, "Mode context value");

    const loggedInUserData =
    JSON.parse(localStorage.getItem("LoginData")) || {};
    console.log(loggedInUserData);

    return(
   <>
   
    <div className={`card-container ${ctx.mode === "dark" ? "dark-mode" : "light-mode"}`}>
            <div className="icon-img" onClick={props.onRedirect}>
                <img src={props.image ? props.image:`https://picsum.photos/id/${props.id}/500/300`} alt="image"></img>
            </div>
            <div>
            <h1>{props.title}</h1>
            <p>{props.desc.length> 90 ? props.desc.substring(0,90)+"...":props.desc}</p>
            </div>
            { loggedInUserData?.role === "Admin" && (
  <div className="btn-con">
    <button className="edit" onClick={props.onEdit}>Edit</button>
    <button className="delete" onClick={props.onDelete}>Delete</button>
  </div>
)}
     </div>
    
    </>   
    );
}