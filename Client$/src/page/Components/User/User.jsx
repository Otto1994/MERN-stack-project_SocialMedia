import React from "react";


const User = ({person})=>{
return(
    <div className="followers">
    <div>
    <img src={person.img} alt="" className="followersImage" />
     <div className="name">
         <span>{person.name}</span>
         <span>@{person.username}</span>
     </div>
    </div>
    <button className="button fc-button">Suivez</button>
 </div>
)
}
export default User