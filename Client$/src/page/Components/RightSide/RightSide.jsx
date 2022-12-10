import React  from "react";
import { useState } from 'react';
import {Link} from 'react-router-dom'
import './RightSide.css'
import Home from "../../../img/home.png";
import Noti from "../../../img/noti.png";
import Comment from "../../../img/comment.png";
import {UilSetting} from '@iconscout/react-unicons'
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";

const RightSide = ()=>{
    const [modelOpened,setmodelOpend]=useState(false)

return(
    <div className="RightSide">
      <div className="navIcons">
        <Link to = '../home'>

        <img src={Home} alt="" />
        </Link>
     
     
      <img src={Noti} alt="" />
      <img src={Comment} alt="" />
      <UilSetting/>
      </div>
      <TrendCard/>
      <button className="button r-button"   onClick={()=>setmodelOpend(true)} >
   
        Partager
      </button>
      <ShareModal 
        modelOpened={modelOpened}
        setmodelOpend={setmodelOpend}
        />
      
    </div>
)
}
export default RightSide