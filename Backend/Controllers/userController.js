import userModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
    const id = req.params.id;
  
    try {
      const user = await userModel.findById(id);
      if (user) {
        const { password, ...otherDetails } = user._doc;
  
        res.status(200).json(otherDetails);
      } else {
        res.status(404).json("No such User");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  // Get all users
export const getAllUsers = async (req, res) => {

    try {
      let users = await userModel.find();
      users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
      })
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  //Update User
  export const updateUser = async (req, res) => {
    const id = req.params.id;

    const {_id,password}=req.body;
     if(id===_id ){
    try {

       if(password){
        const salt =await bcrypt.genSalt(10)
        const hashedPass= await bcrypt.hash(password,salt)
       }

    
        const user=await userModel.findByIdAndUpdate(id,req.body,{new:true})
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        console.log({user, token})
        res.status(200).json({user, token});

      } 
      catch(error){
        res.status(500).json(error)
    }
    }else{
        res.status(404).json("Accès juste pour admin")
  }
   
  }

  //DELETE USER
  export const DeleteUser = async (req, res) => {
    const id = req.params.id;

    const {CurrentUserId,CurrenadminStatus}=req.body;
    if(  id===CurrentUserId || CurrenadminStatus){
    try {
      
          await userModel.findByIdAndDelete(id)
        res.status(200).json(" Le compte a été bien supprimé")

      } 
      catch(error){
        res.status(500).json(error)
    }
    }
    else{
        res.status(404).json("Accès juste pour zaky tu peux juste supprimer ton compte")
  }
   
  }

  //Suivre un User
  export const followUser=async(req,res)=>{

    const id=req.params.id
    const {CurrentUserId}=req.body   
    if (CurrentUserId===id){
      res.status(403).json("Action interdite")
    }
      else{
    try{

     const followUser = await userModel.findById(id)
     const followingUser =await userModel.findById(CurrentUserId)

   if(!followUser.abonnee.includes(CurrentUserId)){
    await followUser.updateOne({$push:{abonnee:CurrentUserId}})
    await followingUser.updateOne({$push:{abonnement:id}})
    res.status(200).json("User est Abonné")

   }else{
    res.status(404).json("User est toujours Abonné  à toi")

   }
        
    }
    catch(error){
      res.status(500).json(error)
  }
 
}
  }
    //Désabonnement un User
    export const UnfollowUser=async(req,res)=>{

        const id=req.params.id
        const {CurrentUserId}=req.body   
        if (CurrentUserId===id){
          res.status(403).json("Action interdite")
        }
          else{
        try{
    
         const unfollowUser = await userModel.findById(id)
         const unfollowingUser =await userModel.findById(CurrentUserId)
    
       if(!unfollowUser.abonnee.includes(CurrentUserId)){
        await unfollowUser.updateOne({$pull:{abonnee:CurrentUserId}})
        await unfollowingUser.updateOne({$pull:{abonnement:id}})
        res.status(200).json("Vous Avez Désabonner cet utilisateur")
    
       }else{
        res.status(404).json("User n'est pas Abonné  par toi")
    
       }
            
        }
        catch(error){
          res.status(500).json(error)
      }
     
    }
      }