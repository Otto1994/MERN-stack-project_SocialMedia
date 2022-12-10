import React from "react";
import './ProfileSide.css'
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";
import FollowCard from "../FollowCard/FollowCard"
const ProfileSide = ()=>{
return(
    <div className="ProfileSide">
        <LogoSearch/>
        <ProfileCard location="homePage"/>
        <FollowCard/>
    </div>
)
}
export default ProfileSide