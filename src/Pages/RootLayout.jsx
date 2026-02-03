import { Outlet } from "react-router-dom";
import { NavBar } from "../Component/Navbar";
import Footer from "../Component/Footer";

export default function RootLayout(){
    return(
        <>
         <NavBar/>

         <Outlet/> {/* define nested Routes */}
         <Footer/>
        </>
       


    )
}