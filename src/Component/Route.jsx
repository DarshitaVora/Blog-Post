import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import { CreatePostPage } from "../Pages/CreatePostPage";
import { LoginPage } from "../Pages/LoginPage";
import RootLayout from "../Pages/RootLayout";
import { PostDetail } from "./PostDetail";
import AuthGuard from "../Guard/AuthGuard";
import NotFound from "./NoDataFound";
import Explore_post from "../Pages/Explore_Posts";

export const router=createBrowserRouter([

    {
        path:"/login",
        element: <LoginPage/>
    },
    {
        path:"/",
        element:<AuthGuard/>,
        children:[
            {
                path:"/",
                element: <HomePage/> ,
            },
            {
                path:"/new-post",
                element: <CreatePostPage/>,
            },
            {
                path:"/posts/:postId",
                element:<PostDetail/>
            },
            {
                path:"/explore-post",
                element:<Explore_post/>
            },

        ]},
        {
            path:"*",
            element:<NotFound/>,
        },
   
    

    
])