import "./Login.css";
import React, { useState } from "react";
import login from "../assets/login.png";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";



export function Login(){
    const[mobile,setMobile]=useState("")
    const[role,setRole]=useState("")
    const[otp,setOtp]=useState("")
    const [loading, setLoading] = useState(true);

    const[mobilevalidation,setMobileValidation]=useState("")
    const[rolevalidation,setRoleValidation]=useState("")
    const[otpvalidation,setOtpValidation]=useState("")
    const[generateOtp,setGenerateOtp]=useState("")

    const navigate = useNavigate()

    const random=Math.floor(1000 + Math.random()* 9000)

   

        const handleMobile = (event) => {
            const value = event.target.value;
        
            if (/^\d*$/.test(value) && value.length <= 10) {
                setMobile(value);
                if (value.length === 10) {
                    setMobileValidation(""); 
                }
            }
        };
    const handleOtp=(event)=>
    {
        event.preventDefault()
        setOtp(random.toString());
        alert("One Time Password:" + random);
        setGenerateOtp(random.toString());

            if(event.target.value){
                setOtpValidation("")
            }
    }
    const handleRole=(event)=>
    {
        if(event.target.value){
            setRoleValidation("")
        }
        setRole(event.target.value)
    }
    const LoginClick = async (event) => {
        event.preventDefault();
        if(!mobile)
        {
            setMobileValidation("Mobile Number is Requried.")
        }
        else if (!/^\d{10}$/.test(mobile)) {
            setMobileValidation("Please enter a valid 10-digit mobile number!");
            return; 
        }
    
        if(!role)
        {
            setRoleValidation("Role Selection is Required.")
        }

        
        if(!otp)
        {
            setOtpValidation("OTP is Required.")
        }
        else if(generateOtp != otp){
            toast.error("Invalid OTP !")
            return;
        }
        if(!mobile || !role || !otp)
            {
                return;
            }

        
        //toast.info("Ok!");
       // toast.error("Error");
      // toast.success("Clear Login");
      const formData={mobile,role,otp};
       // console.log(formData);
        //console.log("Form Submited");

                try{
                        const res = await fetch(
                            "https://696b4a8b624d7ddccaa0b6e5.mockapi.io/users"
                        );
                        const users =await res.json();

                        const existingUser = users ?.find(
                            (user)=>
                                user.mobile == mobile &&
                            user.role == role
                        );

                        if(existingUser){
                            const userExistingData =existingUser;
                            toast.success("Login SuccessFully");
                            setTimeout(()=>{
                                localStorage.setItem("LoginData",JSON.stringify(userExistingData));
                                navigate("/");
                            },2000);
                        } else {


                    setLoading(true);
                    const url='https://696b4a8b624d7ddccaa0b6e5.mockapi.io/users';
                    const method="POST";
                    const response= await fetch(url,{
                        method,
                        headers:{
                            "Content-Type" : "application/json",
                        },
                        body:JSON.stringify(formData),
                    });
                    console.log(response,"res");
                    if(!response.ok){
                        toast.error("Invalid Request");
                    }
                    const data = await response.json();
                    console.log("Form Submitted:",data);
                    toast.success("Login successfully");
                    setTimeout(()=>{
                        localStorage.setItem("LoginData",JSON.stringify(data));
                        navigate("/")
                    },2000);
                }

                } catch {
                    
                }

    };
    
return(

            <div className="Login-container">
                <div className="Login-left">
                <img src={login} alt="Login"></img>
                </div>

                <div className="Login-right">
                        <h2>Hello Again,</h2><br></br>
                        <p className="subtitle">Welcome back, let's get started!</p>

                        <form className="login-form" onSubmit={LoginClick}>
                            <input type="text"
                            placeholder="Mobile Number"
                            className="input-field"
                            onChange={handleMobile}
                            value={mobile}/>
                {mobilevalidation &&(<p className="error">{mobilevalidation}</p>)}
 
                            <select className="input-field" onChange={handleRole} value={role}>
                                <option value="">Select  a Role</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        {rolevalidation &&(<p className="error">{rolevalidation}</p>)}

                            <button className="btn-primary" type="button" onClick={handleOtp}>Generate OTP</button>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="input-field"
                                onChange={(e)=>setOtp(e.target.value)}
                                maxLength={4}
                                value={otp}
                         />
                         
                         {otpvalidation &&(<p className="error">{otpvalidation}</p>)}

                         <button className="btn-secondary" >Login</button>
                         <ToastContainer />
                        </form>
                </div>
            </div>

);
}