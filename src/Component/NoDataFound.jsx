import { NavBar } from "./Navbar";
import Error from "../assets/Error404.gif";
import "./NoDataFound.css";

export default function NotFound() {
  return (
    <>
      <NavBar />

      <div className="notfound-container">
        <img src={Error} alt="404 Error" className="notfound-image" />

        <h1 className="notfound-title">404 - Page Not Found</h1>
        <h3 className="notfound-text">
          The page you are looking for does not exist
        </h3>
      </div>
    </>
  );
}
