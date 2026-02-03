import { useEffect, useState } from "react";
import "./EditProfile.css";

export default function EditModal({ onClose,userId }) {
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    role: "",
    otp: ""
  });
  const [loading, setLoading] = useState(true);
  const[editProfileId,setEditProfileID]=useState(null);

  useEffect(()=>{
    if(userId){
        fetchUserById();
    }
  },[userId])

  const fetchUserById = async ()=>{
    try{
      setLoading(true);
      const response = await fetch(
        `https://696b4a8b624d7ddccaa0b6e5.mockapi.io/users/${userId}`
      );
      const data=await response.json();
      setFormData({
        fullname:data?.fullname||"",
        mobile : data?.mobile ||"",
        role : data?.role||"",
        otp:data?.otp,

      });
    }catch{
      console.error("Fetch user error:",errors);
    }finally{
      setLoading(false);
    }
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // realtime error clear
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullname.trim()) newErrors.fullname = "Full name required";
    if (!/^[0-9]{10}$/.test(formData.mobile)) newErrors.mobile = "Enter valid 10 digit number";
    if (!formData.role) newErrors.role = "Please select role";
    if (!formData.otp.trim()) newErrors.otp = "OTP required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;


    try{
      setLoading(true);
      const response =await fetch(
        `https://696b4a8b624d7ddccaa0b6e5.mockapi.io/users/${userId}`,
        {
          method : "PUT",
          headers :{
            "Content-Type":"application/json",
            },
            body:JSON.stringify(formData),

        }
      );
      if(response.ok){
        const updatedUser = {
          id: userId,           // 👈 id preserve karo
          ...formData
        };
      
        localStorage.setItem("LoginData",JSON.stringify(updatedUser));
        alert("Data Save Successfully");
        onClose();
        }else{
          alert("Data Not Save.");
        }
      }catch(error){
        console.error("Update Error:",error);
        alert("Server Connection Error");
      }finally{
        setLoading(false);
      }

    
  };

  return (
    <div className="modal-overlay">
      <form className="edit-profile-container" onSubmit={handleSubmit}>
        <h3>Edit Profile</h3>

        <div className="form-group">
          <input
            type="text"
            name="fullname"
            placeholder="Enter full name"
            value={formData.fullname}
            onChange={handleChange}
          />
          {errors.fullname && <p className="error">{errors.fullname}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="mobile"
            placeholder="Enter mobile number"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </div>

        <div className="form-group">
          <select name="role" value={formData.role} onChange={handleChange} disabled={true}>
            <option value="">Select Role</option>
            <option>User</option>
            <option>Admin</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            disabled={true}
          />
          {errors.otp && <p className="error">{errors.otp}</p>}
        </div>

        <div className="button-group">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
