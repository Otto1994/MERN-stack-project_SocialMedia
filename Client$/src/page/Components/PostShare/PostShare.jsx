import React from "react";
import './PostShare.css';
import Profile from '../../../img/profileImg.jpg'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useRef, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { uploadImage, uploadPost } from "../../../actions/UploadAction";

const PostShare = ()=>{
const loading=useSelector((state)=>state.PostReducer.uploading)
const [image,setImage]=useState(null);
const ImageRef=useRef();
const desc=useRef()
const dispatch =useDispatch()
const user=useSelector((state)=>state.AuthReducer.authData)
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const resetPost =()=>{
    setImage(null);
    desc:desc.current.value=""

  }
  const handleSubmit =(e)=>{
 e.preventDefault()
 const newPost={
  userId:user._id,
  desc:desc.current.value
   }
   if(image){
    const data=new  FormData();
    const filename = Date.now()+image.name;
    data.append("name",filename);
    data.append("file",image);
    newPost.image=filename;
    console.log(newPost);
    try{
      dispatch(uploadImage(data))
    }
    catch(error){
     console.log(error)
    }
   }
   dispatch(uploadPost(newPost))
   resetPost()
  }

return(
    <div className="PostShare">
      <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
   <div>
    <input type="text" placeholder="Quoi de neuf?"
    ref={desc} required/>
   
   <div className="PostOptions">
        <div className="option"   style={{color:"var(--photo)"}}
        onClick={() => ImageRef.current.click()}>
      
        <UilScenery/> Photo
        </div>
        <div className="option"   style={{color:"var(--video)"}}>
        <UilPlayCircle/>Video
        </div>
        <div className="option"   style={{color:"var(--location)"}}>
        <UilLocationPoint/>Location
        </div>
        <div className="option"   style={{color:"var(--shedule)"}}>
        <UilSchedule/>G-day
        </div>
        <button className="button ps-button"
        onClick={handleSubmit} disabled={loading}>
            {loading? "Importation":"Publier"}
        </button>
        <div style={{display:"none"}}>
           <input type="file"  ref={ImageRef} onChange={onImageChange}/>
        </div>

       {/*<div className="option">
        <UilTimes/>
        </div>*/}
       </div>
   {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
   </div>
    </div>
)
}
export default PostShare