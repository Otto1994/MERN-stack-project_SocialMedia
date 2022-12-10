
import React from "react";
import './ProfileCard.css'
import Cover from '../../../img/cover.jpg'
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";
const ProfileCard = ({location})=>{


const user=useSelector((state)=>state.AuthReducer.authData)
const posts=useSelector((state)=>state.PostReducer.posts)
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

return(
    <div className="ProfileCard">
        <div className="ProfileImages">
        <img src={
            user.coverImage
              ? serverPublic + user.coverImage
              : serverPublic + "defaultCover.jpg"
          } alt="CoverImage" />
        <img
          src={
            user.profileImage
              ? serverPublic + user.profileImage
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
        </div>
        <div className="ProfileName">
            <span>{user.nom} {user.prenom} </span>
            <span>{user.Etude? user.Apropos : 'Write about yourself'}</span>
        </div>
        <div className="followStatus">
            <hr />
            <div>
                <div className="follow">
                    <span>{user.abonnee.length}</span>
                    <span>Abonnés</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>{user.abonnement.length}</span>
                    <span>Abonnement</span>
                </div>
                {location ==='ProfilePage'&& (
                 <>
                 <div className="vl"></div>
                 <div className="follow">
                    <span>{posts.filter((post)=>post.userId===user._id).length}</span>
                    <span>Publications</span>
                </div>
                 </>

                )}
            </div>
            <hr />
        </div>
        {location ==='ProfilePage' ?"": <span style={{color:"#0E0079"}}>
        <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>

         Mon profile</Link>
       </span>}
       
    </div>
)
}
export default ProfileCard