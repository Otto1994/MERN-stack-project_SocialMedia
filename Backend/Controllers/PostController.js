import postModel from "../Models/postModel.js";
import mongoose from "mongoose";
import userModel from "../Models/userModel.js";

export const createPost =async(req,res)=>{

    const newPost = new postModel( req.body)
 
    try{

        await newPost.save()
        res.status(200).json(newPost)
    }
    catch(error){
        res.status(500).json(error)

    }
}

//getPost
export const getPost = async (req, res) => {
    const id = req.params.id;
  
    try {
       const user = await postModel.findById(id);
        res.status(200).json(user);
   
    } catch (error) {
      res.status(500).json(error);
    }
  };

  //updatePost
export const updatePost = async (req, res) => {
    const id = req.params.id;
    const {userId} = req.body
  
    try {
       const post = await postModel.findById(id);
       if(post.userId === userId){
        await post.updateOne({$set:req.body})
        res.status(200).json("Publication modifié");
       }else{
        res.status(403).json("Action interdite")
       }
    
   
    } catch (error) {
      res.status(500).json(error);
    }
  };
    //deletePost
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const {userId} = req.body
  
    try {
       const post = await postModel.findById(id);
       if(post.userId === userId){
        await post.deleteOne();
        res.status(200).json("Publication supprimé");
       }else{
        res.status(403).json("Action interdite")
       }
    
   
    } catch (error) {
      res.status(500).json(error);
    }
  };


  //liked/disliked post
  export const likePost =async(req,res)=>{
    const id = req.params.id;
    const {userId} = req.body

    try {
      const post = await postModel.findById(id);
       if(!post.likes.includes(userId)){
        await post.updateOne({$push:{likes:userId}});
        res.status(200).json("Publication Liké");
       }else{
        await post.updateOne({$pull:{likes:userId}});
        res.status(200).json("Publication disLiké");
       }
  
   } catch (error) {
     res.status(500).json(error);
   }
  }


  //TimeLinePosts
  export const TimeLinePosts =async(req,res)=>{
    const userId = req.params.id;


    try {
      const currentUserPost = await postModel.find({userId:userId});
     const followingPosts= await userModel.aggregate([
      {
                  $match :{
                    _id:new mongoose.Types.ObjectId(userId)
                  }

      },{
        $lookup:{
          from:"posts",
          localField:"abonnement",
          foreignField:"userId",
          as:"followingPosts"
        }
      },{
        $project:{
          followingPosts:1,
          _id:0
        }
      }
     ])
        res.status(200).json(currentUserPost.concat(...followingPosts[0].followingPosts
          .sort((a,b)=>{
              return b.createdAt-a.createdAt;
            }
          )));
     
   } catch (error) {
     res.status(500).json(error);
   }
  }
