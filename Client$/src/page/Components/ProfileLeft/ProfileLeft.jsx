import React from "react";
import './ProfileLeft.css'
import LogoSearch from "../LogoSearch/LogoSearch";
import FollowCard from "../FollowCard/FollowCard";
import InfoCard from "../InfoCard/InfoCard";

const ProfileLeft = ()=>{
return(
    <div className="ProfileSide">
     <LogoSearch/>
     <InfoCard/>
     <FollowCard/>
    </div>
)
}
export default ProfileLeft