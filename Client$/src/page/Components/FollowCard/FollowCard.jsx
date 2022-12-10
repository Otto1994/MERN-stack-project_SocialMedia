
import React, { useEffect } from "react";
import './FollowCard.css'
import {Followers} from "../../../Data/FollowerData";
import User from "../User/User";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../../api/UserRequest";
const FollowCard = ()=>{
    const [persons,setPersons]=useState([])
    const user=useSelector((state)=>state.AuthReducer.authData)

    useEffect(()=>{
        const fetchPersons = async()=>{
       const {data}=await getAllUsers()
         setPersons(data)
         console.log(data)
         
        };
        fetchPersons();
    },[])
return(
    <div className="FollowCard">
    <h3>Qui vous suit?</h3>
    { Followers.map ((person,id)=>{
        return(
        <User person={person} key={id}/>
        )
    })}
   
    </div>
)
}
export default FollowCard