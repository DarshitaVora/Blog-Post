import React, { useContext } from "react"; 
import { AddPost } from "../Component/AddPost";
import ModeContext from "../Context/ModeContext";


export function CreatePostPage() {
    
    const ctx = useContext(ModeContext);

    return (
    
        <div className={ctx.mode === "dark" ? "bg-dark-style" : "bg-light-style"}>
            <AddPost />
        </div>
    );
}
