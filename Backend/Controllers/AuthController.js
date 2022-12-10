import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//Inscription
export const Register =async(req,res)=>{

    

    const salt =await bcrypt.genSalt(10)
    const hashedPass= await bcrypt.hash(req.body.password,salt)
    req.body.password=hashedPass
    const NewUser= new userModel(req.body)
    const {email}=req.body
    try{
        const oldUser=await userModel.findOne({email})
        if(oldUser){
            res.status(400).json({message:"Ce compte existe toujours"})

        }
        const user=await NewUser.save()
        const token =jwt.sign(
           {
            email:user.email
            ,id:user._id
           },process.env.JWT_KEY,{expiresIn:'1h'}
        )

        res.status(200).json({user,token})
    }
    catch(error){
        res.status(500).json({message:error.message})

    }
}

//Connextion
export const Login =async(req,res)=>{

    const {email,password} = req.body

    

    
 
    try{
        const user=await userModel.findOne({email:email})
      if(user){
           const validity =await bcrypt.compare(password,user.password)
           validity? res.status(200).json(user): res.status(400).json("Mot de passe incorrect")
          }else{
            res.status(404).json("Aucun compte correspond à cette Adresse Email")
          }
        
    }
    catch(error){
        res.status(500).json({message:error.message})

    }
}