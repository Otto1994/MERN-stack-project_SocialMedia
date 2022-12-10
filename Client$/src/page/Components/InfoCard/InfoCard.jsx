
import React, { useEffect } from "react";
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfilModal from "../ProfileModal/ProfileModal";
import { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import * as UserApi from "../../../api/UserRequest.js";
import { logout } from "../../../actions/AuthAction";
const InfoCard = ()=>{
const user=useSelector((state)=>state.AuthReducer.authData)
const [modelOpened,setmodelOpend]=useState(false)
const dispatch =useDispatch()
const params =useParams()
const profileUserId=params.id
const [profileUser,setProfileUser]=useState({})


const handleLogOut = ()=> {
    dispatch(logout())
  }

useEffect(()=>{
    const fetchProfileUser = async()=>{
     if (profileUserId ===user._id)  {
        setProfileUser(user)
       
     }
     else{
        const profileUser =await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)

     }
    }
    fetchProfileUser();
},[user])
return(
    <div className="InfoCard">
    <div className="infoHead">
        <h3>Vos informations</h3>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setmodelOpend(true)}
            />
            <ProfilModal
              modelOpened={modelOpened}
              setmodelOpend={setmodelOpend}
              data = {user}
            />
          </div>
        ) : (
          ""
        )}
    </div>
    <div className="info">
        <span>
            <b>Status </b>
        </span>
        <span>{profileUser.Status}</span>
    </div>
    <div className="info">
        <span>
            <b>De </b>
        </span>
        <span>{profileUser.De}</span>
    </div>
    <div className="info">
        <span>
            <b>Etudié </b>
        </span>
        <span>{profileUser.Etude}</span>
    </div>
    <button className="button logout-button"  onClick={handleLogOut}>Déconnecter</button>
    </div>
)
}
export default InfoCard