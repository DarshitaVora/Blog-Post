import React, { useContext } from "react";
import ExplorePost from "../Component/ExplorePost";
import ModeContext from "../Context/ModeContext";

export default function Explore_post() {

    const ctx = useContext(ModeContext);

    return (
        <div className={ctx.mode === "dark" ? "bg-dark-style" : "bg-light-style"}>
            <ExplorePost />
        </div>
    );
}
