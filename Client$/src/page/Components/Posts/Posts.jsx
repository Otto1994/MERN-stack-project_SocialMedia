import React, { useEffect } from "react";
import './Posts.css'
import Post from "../Post/Post";
import {useDispatch,useSelector} from 'react-redux'
import { getTimeLinePosts } from "../../../actions/PostAction";

const Posts = ()=>{
const dispatch =useDispatch()
const user=useSelector((state)=>state.AuthReducer.authData)
const {posts}=useSelector((state)=>state.PostReducer)
const {loading}=useSelector((state)=>state.PostReducer)
useEffect(()=>{
dispatch(getTimeLinePosts(user._id))
},[])
return(
    <div className="Posts">
     { 
    loading?"Fetching post ...": posts.map ((posts,id)=>{
        return <Post data={posts} id={id}/>     
            
    })}
   
    </div>
)
}
export default Posts