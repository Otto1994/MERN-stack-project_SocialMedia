import mongoose from "mongoose";

const UserSchema=mongoose.Schema(
    {
        nom:{
        type:String,
        required:true},
        prenom:{
        type:String,
        required:true},
        email: {
        type:String,
        required:true
      },
      password: {
        type:String,
        required:true
      },
      isAdmin: {
        type:Boolean,
        default:false
      },
      profileImage:String,
      coverImage:String,
      Apropos:String,
      Etude:String,
      De:String,
      Status:String,
      pays:String,
      abonnee:[],
      abonnement:[]


      

    },{
        timestamps:true
    }
)
const userModel =mongoose.model('users',UserSchema)

export default userModel;