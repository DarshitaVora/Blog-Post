
import { Navigate, useNavigate } from "react-router-dom";
import { Card } from "../Component/Card";
import ConformationModel from "../Component/ConformationModel";
import { useContext,useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import ModeContext from "../Context/ModeContext";


export function HomePage(){
  const navigate=useNavigate();

  const ctx = useContext(ModeContext); // <-- use context here
  console.log(ctx, "Mode context value");

  const[showModal,setShowModel]=useState(false);
  const[selectedIndex,setSelectedIndex]=useState(null);

    const allPostData=JSON.parse(localStorage.getItem("postData"))||[];
    console.log(allPostData);

    const openDeleteModal=(index)=>{
      console.log(index,"Index");
      setSelectedIndex(index)
      setShowModel(true);
    }
    const clickHandler=(id)=>{
      navigate(`/posts/${id}`);
    };

    const confirmDelete=()=>{
      const updatedPostData=allPostData.filter((_, i)=>i !==selectedIndex);
      console.log(updatedPostData,"UpdatedData")
      localStorage.setItem("postData",JSON.stringify(updatedPostData));
      setShowModel(false);
    };

   const handleEdit=(id)=>{
    console.log({id});
    navigate("/new-post",{state:{id}});
   }

   const scrollToSection =(id)=>{
    const element= document.getElementById(id);
    if(element){
      element.scrollIntoView({behavior:'smooth'});
    }
   };
      return(
    <>
     
    
    <div className={`card-show ${ctx.mode === "dark" ? "dark-mode" : "light-mode"}`}>
   
    
    <span id='top'></span>
    
    <h1 className="page-title">
        Created Posts
      </h1>
      {allPostData.length === 0 ? (
  <p className="no">No Data found</p>
) : (
  allPostData.map((item, index) => {
    console.log(item, index);
    

    return (
      <Card
        key={index}
        title={item.title}
        desc={item.body}
        image={item.image}
        onDelete={() => openDeleteModal(index)}
        onRedirect={()=>clickHandler(item.id)}
        onEdit={()=>handleEdit(item.id)}
      />

      
    );
  })
)}
    
    <button className="back-to-top" onClick={() => scrollToSection("top")}>
  <FaChevronUp /> {/* card.css ma aani css mukel che */}
</button>

    </div>
    
    {showModal && (<ConformationModel 
        title="Delete Post?"
        desc="Are you sure you want to delete this post ?"
        onClose={()=>setShowModel(false)}
        onConfrim={confirmDelete}
        confirmBtnText="Delete"
       
      />
      )} 


      
    
  
  
    </>
    
    );
    
}