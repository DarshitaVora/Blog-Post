import { Navigate } from "react-router-dom";
import RootLayout from "../Pages/RootLayout";

export default  function AuthGuard(){
    const loginData=JSON.parse(localStorage.getItem("LoginData"));

    if(!loginData){
        return <Navigate to="/login" replace/>
    }
    return <RootLayout/>;
}